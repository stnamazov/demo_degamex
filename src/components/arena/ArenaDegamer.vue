<script setup>
import axios from "axios"
import Phaser from 'phaser'
import { SpinePlugin } from "@esotericsoftware/spine-phaser"
import { onMounted, onUnmounted, ref, watch, computed, defineProps, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import Loading from '@/components/Loading.vue'
import Icon from '@/components/Icon.vue'
import BWrapper from "@/components/BWrapper.vue"
import Button from "@/components/Button.vue"
import { isDemo } from '@/demo/demo.js'
import { demoTraitsForTokenId } from '@/demo/degamerTraits.js'

const store = useStore()

const props = defineProps({
    id: { type: Number, default: 0 },
})

const isConnecting = computed(() => store.getters.isConnecting)
const authToken = computed(() => store.getters.authToken)
const address = computed(() => store.getters.address)

const isLoading = ref(true)
const isPhaserPreloading = ref(true)
const phaser = ref()
const degamer = ref()
const instance = getCurrentInstance()
const containerId = `degamer-container-${String(props.id)}-${instance?.uid ?? Math.floor(Math.random() * 1e9)}`

function pickFromSeed(seed, arr) {
    if (!arr.length) return null
    return arr[seed % arr.length]
}

function seedFromTokenId(tokenId, salt = 0) {
    const s = String(tokenId ?? '')
    let acc = 0
    for (let i = 0; i < s.length; i++) acc = (acc * 31 + s.charCodeAt(i) + salt) >>> 0
    return acc
}

function findFirstSkin(skeleton, names) {
    for (const name of names) {
        const skin = skeleton.data.findSkin(name)
        if (skin) return skin
    }
    return null
}

const DEFAULT_WIDTH = 800
const DEFAULT_HEIGHT = 800
const CENTER_W = DEFAULT_WIDTH / 2
const CENTER_H = DEFAULT_HEIGHT / 2
const START_SCALE = 1

const phaserConfig = {
    type: Phaser.WEBGL,
    transparent: true,
    parent: containerId,
    plugins: { scene: [{ key: "spine.SpinePlugin", plugin: SpinePlugin, mapping: "spine", start: true }] },
    scene: {

        // ------------------------- preload ------------------------------ //
        preload(){
            
            this.load.spineBinary("degamer-data", './assets/spine/degamers/degamer.json')
            this.load.spineAtlas("degamer-atlas", './assets/spine/degamers/degamers.atlas')
            this.load.on('complete', () => {
                isPhaserPreloading.value = false
            })

        },

        // ------------------------- create ------------------------------ //
        create() {
            
            degamer.value = this.make.spine({ x: CENTER_W, y: CENTER_H, dataKey: "degamer-data", atlasKey: "degamer-atlas" })
            this.add.existing(degamer.value)
            degamer.value.animationState.setAnimation(0, "idle", true)
            degamer.value.animationState.timeScale = 0.5

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

async function getDegamerData(tokenId){
        
    if (isDemo) {
        isLoading.value = true

        const isDummy = tokenId === 'dummy' || tokenId === 0 || tokenId == null

        if (isDummy) {
            degamer.value.skeleton.setSkinByName(`dummy`)
            degamer.value.skeleton.setToSetupPose()
            isLoading.value = false
            return
        }

        const skeleton = degamer.value.skeleton
        const traits = demoTraitsForTokenId(tokenId)

        // Assemble composite skin similar to backend-driven logic
        // Prefer type_# variants, fallback to named variants (human/meta/zombie/etc) if needed.
        const headSkin = findFirstSkin(skeleton, [
            `${traits.type}/head/type_${traits.body}`,
            `${traits.type}/head/human`,
            `${traits.type}/head/light`,
            `${traits.type}/head/normal`,
        ])
        const bodySkin = findFirstSkin(skeleton, [
            `${traits.type}/body/type_${traits.body}`,
            `${traits.type}/body/human`,
            `${traits.type}/body/light`,
            `${traits.type}/body/normal`,
        ])
        const handSkin = findFirstSkin(skeleton, [
            `${traits.type}/left_hand/type_${traits.body}`,
            `${traits.type}/left_hand/type_1`,
            `dummy/left_hand_light`,
        ])
        const clotheSkin = findFirstSkin(skeleton, [
            `${traits.type}/clothe/clothe_${traits.clothe}`,
            `${traits.type}/clothe/arena_hoodie`,
            `${traits.type}/clothe/blast_hoodie`,
            `${traits.type}/clothe/none`,
        ])
        const eyesSkin = findFirstSkin(skeleton, [
            `${traits.type}/eyes/eyes_${traits.eyes}`,
            `${traits.type}/eyes/eyes${traits.eyes}`,
            `${traits.type}/eyes/eye${traits.eyes}`,
            `${traits.type}/eyes/eyes_1`,
        ])
        const hairsSkin = findFirstSkin(skeleton, [
            `${traits.type}/hairs/hairs_${traits.hairs}`,
            `${traits.type}/hairs/hairs${traits.hairs}`,
            `${traits.type}/hairs/blast_cap`,
            `${traits.type}/hairs/degamex_cap`,
        ])
        const mouthSkin = findFirstSkin(skeleton, [
            `${traits.type}/mouth/mouth_${traits.mouth}`,
            `${traits.type}/mouth/mouth${traits.mouth}`,
            `${traits.type}/mouth/mouth1`,
            `${traits.type}/mouth/mouth`,
        ])

        // Start from head skin (or dummy) then layer the rest
        if (headSkin) skeleton.setSkin(headSkin)
        else skeleton.setSkinByName('dummy')

        const add = (skin) => { if (skin) skeleton.skin.addSkin(skin) }
        add(bodySkin)
        add(handSkin)
        add(clotheSkin)
        add(eyesSkin)
        add(hairsSkin)
        add(mouthSkin)

        degamer.value.skeleton.setToSetupPose()
        isLoading.value = false
        return
    }

    if (authToken){
        
        isLoading.value = true
        
        if (tokenId != 'dummy'){

            const degamerTraitsRes = await axios.post(`${import.meta.env.VITE_API_URL}/v1/arena/get_degamer_traits`,{
                address: address.value,
                authToken: authToken.value,
                tokenId: tokenId
            })

            const traits = degamerTraitsRes.data.result

            degamer.value.skeleton.setSkinByName(`${traits.type}/head/type_${traits.body}`)
            degamer.value.skeleton.skin.addSkin(degamer.value.skeleton.data.findSkin(`${traits.type}/body/type_${traits.body}`))
            degamer.value.skeleton.skin.addSkin(degamer.value.skeleton.data.findSkin(`${traits.type}/left_hand/type_${traits.body}`))
            degamer.value.skeleton.skin.addSkin(degamer.value.skeleton.data.findSkin(`${traits.type}/clothe/clothe_${traits.clothe}`))
            degamer.value.skeleton.skin.addSkin(degamer.value.skeleton.data.findSkin(`${traits.type}/eyes/eyes_${traits.eyes}`))
            degamer.value.skeleton.skin.addSkin(degamer.value.skeleton.data.findSkin(`${traits.type}/hairs/hairs_${traits.hairs}`))
            degamer.value.skeleton.skin.addSkin(degamer.value.skeleton.data.findSkin(`${traits.type}/mouth/mouth_${traits.mouth}`))
            
        } else {
            degamer.value.skeleton.setSkinByName(`dummy`)
        }

        degamer.value.skeleton.setToSetupPose()

        isLoading.value = false

    }

}

watch([() => props.id, () => isPhaserPreloading.value], async ([newTokenId, newIsPhaserPreloading], [oldTokenId, oldIsPhaserPreloading]) => {
  if (!newIsPhaserPreloading) {
    await getDegamerData(newTokenId)
  }
}, { immediate: true })

onMounted(() => {
    phaser.value = new Phaser.Game(phaserConfig)
})

onUnmounted(() => {
    if (phaser.value) {
        phaser.value.destroy(true)
        phaser.value = null
    }
})

</script>

<template>
   <div class="flex flex-col items-center justify-center relative select-none min-w-[200px] min-h-[200px]">
        <Loading v-if="isLoading" class="w-[50px]" />
        <div :id="containerId" class="relative w-full" :class="{'hidden': isLoading}" ></div>
   </div>
</template>