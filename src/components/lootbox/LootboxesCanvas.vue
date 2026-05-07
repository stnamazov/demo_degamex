<script setup>
import axios from "axios"
import Phaser from 'phaser'
import { SpinePlugin } from "@esotericsoftware/spine-phaser"
import { onMounted, onUnmounted, ref, watch, computed, defineEmits, nextTick } from 'vue'
import { useStore } from 'vuex'
import Loading from '@/components/Loading.vue'
import Icon from '@/components/Icon.vue'
import BWrapper from "@/components/BWrapper.vue"
import Button from "@/components/Button.vue"
import LootboxItem from "@/components/lootbox/LootboxItem.vue"
import Modal from "@/components/Modal.vue"
import { isDemo, getDemoState, setDemoLootboxes, demoPickLootboxContents, getDemoLootboxesTotalCount, setDemoState } from '@/demo/demo.js'

const store = useStore()

const emit = defineEmits(['open'])

const isConnecting = computed(() => store.getters.isConnecting)
const authToken = computed(() => store.getters.authToken)
const address = computed(() => store.getters.address)

const isLoading = ref(true)
const isOpening = ref(false)
const isComplete = ref(false)
const isSpineAvailable = ref(!isDemo)
const phaser = ref()
const lootbox = ref()
const lootboxesData = ref([])
const currentLootboxId = ref(0)
const resultOpenLootbox = ref(false)
const isOpenAllModal = ref(false)
const pendingEmitContents = ref(null)
const openNonce = ref(0)
const awaitingDemoOpenComplete = ref(false)
const showLastAccrualModal = ref(false)

const lastAccrual = ref([])

const DEFAULT_WIDTH = 480
const DEFAULT_HEIGHT = 600
const CENTER_W = DEFAULT_WIDTH / 2
const CENTER_H = DEFAULT_HEIGHT / 2
const START_SCALE = 0.5

const phaserConfig = {
    type: Phaser.WEBGL,
    transparent: true,
    parent: 'lootbox-container',
    plugins: { scene: [{ key: "spine.SpinePlugin", plugin: SpinePlugin, mapping: "spine", start: true }] },
    scene: {

        // ------------------------- preload ------------------------------ //
        preload(){
            // In demo mode we must not depend on backend.
            // If the repo doesn't contain lootbox spine assets, we gracefully fallback to buttons-only UI.
            const startBorderUrl = isDemo ? `./assets_api/start_border.png` : `${import.meta.env.VITE_API_URL}/assets/start_border.png`
            const lootboxJsonUrl = isDemo ? `./assets_api/lootbox.json` : `${import.meta.env.VITE_API_URL}/assets/lootbox.json`
            const lootboxAtlasUrl = isDemo ? `./assets_api/lootbox.atlas` : `${import.meta.env.VITE_API_URL}/assets/lootbox.atlas`

            this.load.image('start-border', startBorderUrl)
            this.load.spineBinary("lootbox-data", lootboxJsonUrl)
            this.load.spineAtlas("lootbox-atlas", lootboxAtlasUrl)

            this.load.on('complete', () => {
                isComplete.value = true
            })

            this.load.on('loaderror', () => {
                // asset missing (common in demo), fallback
                isSpineAvailable.value = false
                isComplete.value = false
                isLoading.value = false
                try { this.game.destroy(true) } catch {}
            })
        },

        // ------------------------- create ------------------------------ //
        async create() {
            if (!isSpineAvailable.value) return
            lootbox.value = this.make.spine({ x: CENTER_W, y: DEFAULT_HEIGHT - 70, dataKey: "lootbox-data", atlasKey: "lootbox-atlas" })
            this.add.existing(lootbox.value)
            lootbox.value.animationState.setAnimation(0, "closed", true)
            lootbox.value.animationState.timeScale = 0.5
            lootbox.value.animationState.addListener({
                event: (entry, event) => {
                    // Some rigs may fire 'open' events in other animations.
                    // We only react if this open was initiated by user click.
                    if (!isOpening.value) return
                    if (event?.data?.name !== 'open') return
                    if (!resultOpenLootbox.value?.lootbox_contents) return

                    // In demo we do NOT rely on this event at all (it can fire on page load).
                    if (!isDemo) {
                        setTimeout(() => { emit('open', resultOpenLootbox.value.lootbox_contents) }, 300)
                    }

                    if (!isDemo) {
                        setTimeout(() => {
                            lootbox.value.animationState.setAnimation(0, "closed", true)
                            if (lootboxesData.value.length > 0 && resultOpenLootbox.value?.lootboxes){
                                currentLootboxId.value = currentLootboxId.value > resultOpenLootbox.value.lootboxes.length - 1 ? 0 : currentLootboxId.value
                                lootboxesData.value = resultOpenLootbox.value.lootboxes
                                lootbox.value.skeleton.setSkinByName(lootboxesData.value[currentLootboxId.value].type)
                                lootbox.value.skeleton.setToSetupPose()
                            }
                            isOpening.value = false
                        }, 1000);
                    }
                },
                complete: (entry) => {
                    if (!isDemo) return
                    if (!awaitingDemoOpenComplete.value) return
                    if (entry?.animation?.name !== 'open') return

                    const contents = pendingEmitContents.value
                    pendingEmitContents.value = null
                    awaitingDemoOpenComplete.value = false

                    if (contents && contents.length) {
                        setTimeout(() => emit('open', contents), 50)
                    }
                    // demo: do not show canvas-level accrual modal; Account modal is enough

                    setTimeout(() => {
                        try { lootbox.value?.animationState?.setAnimation(0, "closed", true) } catch {}
                        if (lootboxesData.value.length > 0) {
                            const current = lootboxesData.value[currentLootboxId.value]
                            if (current?.type && lootbox.value?.skeleton) {
                                lootbox.value.skeleton.setSkinByName(current.type)
                                lootbox.value.skeleton.setToSetupPose()
                            }
                        }
                        isOpening.value = false
                    }, 300)
                },
            })

            await getLootboxesData()

            // Set initial skin immediately (otherwise it becomes visible only after first arrow click)
            if (lootboxesData.value.length > 0 && lootbox.value?.skeleton) {
                const initialType = lootboxesData.value[currentLootboxId.value]?.type || lootboxesData.value[0]?.type
                if (initialType) {
                    lootbox.value.skeleton.setSkinByName(initialType)
                    lootbox.value.skeleton.setToSetupPose()
                }
            }

        },

        // ------------------------- update ------------------------------ //
        update(time, delta) {

        }

    },
    scale: {
        mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
        autoCenter: Phaser.Scale.NO_CENTER,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
    }
}

async function getLootboxesData(){
        
    if (isDemo) {
        isLoading.value = true
        const demo = getDemoState()
        lootboxesData.value = (demo.lootboxes || []).filter(l => (parseInt(l.count) || 0) > 0)
        // keep the data, but don't auto-open the modal on page load
        lastAccrual.value = demo.lastAccrual || []
        isLoading.value = false
        return
    }

    if (authToken){
        
        isLoading.value = true
        const lootboxesDataRes = await axios.post(`${import.meta.env.VITE_API_URL}/v1/lootboxes/get_data`,{
            address: address.value,
            authToken: authToken.value
        })

        if (lootboxesDataRes.data.result.lootboxes && lootboxesDataRes.data.result.lootboxes.length > 0){
            lootboxesData.value = lootboxesDataRes.data.result.lootboxes
            if( isComplete.value ){
                lootbox.value.skeleton.setSkinByName(lootboxesData.value[currentLootboxId.value].type)
                lootbox.value.skeleton.setToSetupPose()
            }
        }

        if (lootboxesDataRes.data.result.last_accrual && lootboxesDataRes.data.result.last_accrual.length > 0){
            lastAccrual.value = lootboxesDataRes.data.result.last_accrual
        }

        isLoading.value = false

    }

}

async function open(isAll){
    
    if (!isOpening.value){
        isOpenAllModal.value = false
        if (isDemo) {
            isOpening.value = true
            openNonce.value++
            const demo = getDemoState()
            const type = lootboxesData.value[currentLootboxId.value]?.type
            if (!type) {
                isOpening.value = false
                return
            }

            const nextLootboxes = [...(demo.lootboxes || [])]
            const idx = nextLootboxes.findIndex(l => l.type === type)
            const available = idx >= 0 ? (parseInt(nextLootboxes[idx].count) || 0) : 0
            // demo: lootboxes are infinite; cap "open all" to keep UI reasonable
            const toOpen = isAll ? 10 : 1
            if (toOpen <= 0) {
                isOpening.value = false
                return
            }

            const openedContents = []
            for (let i = 0; i < toOpen; i++) {
                openedContents.push(...demoPickLootboxContents(type))
            }

            // demo: do NOT decrease lootbox count (infinite demo)
            // keep state as-is so lootboxes never end

            const nextAccrual = openedContents.map(x => ({ title: x.title, value: x.value }))
            // demo: keep in state (optional), but don't show a second modal
            setDemoState({ lastAccrual: nextAccrual })

            // refresh local lists
            await getLootboxesData()
            await store.dispatch('setLootboxesCount', getDemoLootboxesTotalCount())

            // If spine is available - play real open animation and let the spine event emit results.
            if (isSpineAvailable.value && lootbox.value?.animationState) {
                resultOpenLootbox.value = {
                    lootbox_contents: openedContents,
                    lootboxes: lootboxesData.value,
                }
                pendingEmitContents.value = openedContents
                awaitingDemoOpenComplete.value = true
                lootbox.value.animationState.setAnimation(0, "open_process", true)
                // "open" event is emitted from spine timeline; we also trigger the open animation.
                setTimeout(() => {
                    try { lootbox.value.animationState.setAnimation(0, "open", false) } catch {}
                }, 250)
            } else {
                // fallback: emulate animation delay and then emit open contents
                setTimeout(() => {
                    emit('open', openedContents)
                    isOpening.value = false
                }, 600)
            }
            return
        }

        isOpening.value = true
        lootbox.value.animationState.setAnimation(0, "open_process", true)
        const openUrl = isAll ? `${import.meta.env.VITE_API_URL}/v1/lootboxes/open_all` : `${import.meta.env.VITE_API_URL}/v1/lootboxes/open_one`
        const openDataRes = await axios.post( openUrl, {
            address: address.value,
            authToken: authToken.value,
            type: lootboxesData.value[currentLootboxId.value].type
        })

        if (openDataRes.data.result){

            resultOpenLootbox.value = openDataRes.data.result
            lootbox.value.animationState.setAnimation(0, "open", false)
            
            // update total lootboxes count in header
            let totaCount = 0
            for (const lootbox of openDataRes.data.result.lootboxes) { totaCount += parseInt(lootbox.count) }
            await store.dispatch('setLootboxesCount', totaCount)

        }

    }
    
}

watch(currentLootboxId, async () => { 
    if (lootbox.value?.skeleton && lootboxesData.value[currentLootboxId.value]){
        lootbox.value.skeleton.setSkinByName(lootboxesData.value[currentLootboxId.value].type)
        lootbox.value.skeleton.setToSetupPose()
    }
}, { immediate: true })

onMounted(() => {
    if (!isDemo) {
        watch(authToken, async () => { 
            await getLootboxesData()
            await nextTick()
            phaser.value = new Phaser.Game(phaserConfig)
        }, { immediate: true })
        return
    }

    // demo: try to boot phaser with local assets; if missing we'll fallback automatically
    isSpineAvailable.value = true
    getLootboxesData().then(async () => {
        await nextTick()
        phaser.value = new Phaser.Game(phaserConfig)
    })
})

onUnmounted(() => {
    if (phaser.value) {
        phaser.value.destroy(true)
        phaser.value = null
    }
})


</script>

<template>
   <div class="flex flex-col items-center justify-center relative  select-none">

        <Loading v-if="isLoading" class="w-[100px]" />
        
        <div v-else-if="lootboxesData.length > 0" class="relative w-full mb-[-30px] mt-[-80px] pt-[80px] z-10">
            
            <div class="flex items-center justify-center gap-5 py-2 px-10 orbitron" >
                <Icon v-if="true" type="prev" class="icon size-4" @click="currentLootboxId--" :class="{'disabled': currentLootboxId == 0 }"  />
                <div class="text-sm uppercase">{{lootboxesData[currentLootboxId].type}}</div>
                <Icon v-if="true" type="next" class="icon size-4" @click="currentLootboxId++" :class="{'disabled': currentLootboxId == lootboxesData.length - 1 }" />
            </div>

            <div class="flex items-center justify-center w-[40px] absolute top-[100%] right-[15%]  select-none">
                <span class="absolute text-xl font-black text-white">{{lootboxesData[currentLootboxId].count}}</span>
                <svg class="w-full" viewBox="0 0 80 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M79.3777 13.7375L65.847 0L13.5307 3.69941e-06L0 13.7375L4.76673e-06 68.2625L13.5307 82L65.847 82L79.3777 68.2625L79.3777 13.7375Z" fill="#FF3D00"/>
                </svg>
            </div>

        </div>

        <div class="w-[300px]" :class="{'hidden': lootboxesData.length == 0}" >
            <div v-show="!isDemo || isSpineAvailable" id="lootbox-container" class="relative mt-[-80px] cursor-pointer" :class="{'z-20': isOpening, 'z-0': !isOpening}" @click="open()"></div>
            <div v-show="isDemo && !isSpineAvailable" class="w-full mt-[-40px] flex flex-col items-center gap-3 text-center">
                <p class="text-xs opacity-60 max-w-[260px]">
                    Lootbox animation assets are missing locally. Add them to
                    <span class="opacity-80">public/assets/spine/lootboxes</span>
                    to enable Spine animation in demo mode.
                </p>
                <Button @click="open(false)" text="Open" stroke="#FAFF00" :width="200" class="text-sm" :class="{'disabled': isOpening}" />
                <Button @click="isOpenAllModal = true" text="Open all" stroke="#FFFFFF" :width="200" class="text-sm" :class="{'disabled': isOpening}" />
            </div>
        </div>
        <div v-if="lootboxesData.length == 0 && !isLoading" class="p-10">
            <p>You don't have any lootboxes</p>
            <p>Farm it on the <RouterLink to="/arena">Arena</RouterLink></p>
        </div>

        <Modal v-if="!isDemo && showLastAccrualModal && lastAccrual.length > 0" @modal-close="() => { lastAccrual = []; showLastAccrualModal = false; }">

            <div class="flex items-center justify-center gap-5" >

                <div v-for="(loot, index) in lastAccrual" v-bind:key="index" class="w-[200px]">
                    <img class="w-full" src="@/assets/lootbox/lootbox-result-points.svg" />
                    <p class="orbitron text-sm uppercase" ><span class="text-2xl text-main font-black mr-2" >{{loot.value}}</span>x {{loot.title}}</p>
                </div>
                
            </div>
            <Button @click="() => { lastAccrual = []; showLastAccrualModal = false; }" text="Ok" stroke="#FFFFFF" class="mt-6" />

        </Modal>

        <Modal v-if="isOpenAllModal" @modal-close="isOpenAllModal = false">

            <div class="flex items-center justify-center gap-5" >
                <p>You are going to open all the lootboxes of <span class="uppercase">{{lootboxesData[currentLootboxId].type}}</span>  tier. Are you sure?</p>
            </div>
            <div class="flex items-center justify-center gap-2">
                <Button @click="open(true)" text="Yes, open all" stroke="#FAFF00" class="mt-6 text-sm" :width="180" />
                <Button @click="isOpenAllModal = false" text="No" stroke="#FFFFFF" class="mt-6 text-sm" :width="180" />
            </div>

        </Modal>

   </div>
</template>