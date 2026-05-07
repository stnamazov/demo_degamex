<script setup>

    import axios from "axios"
    import { ref, watch, computed } from 'vue'
    import { useStore } from 'vuex'
    import Loading from '@/components/Loading.vue'
    import Icon from '@/components/Icon.vue'
    import { isDemo, getDemoState } from '@/demo/demo.js'

    const store = useStore()

    const isConnecting = computed(() => store.getters.isConnecting)
    const authToken = computed(() => store.getters.authToken)
    const address = computed(() => store.getters.address)

    const isLoading = ref(true)
    const userData = ref(false)

    async function getUserData(){
        
        if (isDemo) {
            const demo = getDemoState()
            const plays = demo.arena?.played ?? 0
            const wins = demo.arena?.wins ?? 0
            const losses = demo.arena?.losses ?? 0
            const total = Math.max(plays, wins + losses, 1)
            userData.value = {
                plays,
                wins,
                losses,
                wins_persent: Math.round((wins / total) * 100),
                losses_persent: Math.round((losses / total) * 100),
            }
            isLoading.value = false
            return
        }

        if (authToken){
            isLoading.value = true
            const userDataRes = await axios.post(`${import.meta.env.VITE_API_URL}/v1/arena/get_user_data`, {
                address: address.value,
                authToken: authToken.value
            })
            
            userData.value = userDataRes.data.result
            isLoading.value = false
        }

    }

    watch(authToken, async () => { await getUserData() }, { immediate: true })

</script>

<template>

    <div>
        <div v-if="isLoading" class="flex flex-col items-center text-center">
            <Loading class="w-[50px]" />
        </div>
        <div v-else class="flex flex-wrap md:flex-nowrap  gap-6 md:gap-12 px-5 md:px-14">
            <!--div>
                <p class="flex items-center gap-3 mb-0" >
                    Daily prizes
                    <Icon 
                        @click="store.dispatch('setModalMessage', `
                            <p>You can win additional boxes daily depending on the degamers you own:</p>
                            <div class='flex gap-2'>
                                <p>Base +2</p>
                                <p>Rare +3</p>
                                <p>Epic +4</p>
                            </div>
                        `)" 
                        :class="false ? 'opacity-70' : 'opacity-30'"
                        type="q" 
                        color="#FFFFFF"  
                        class="icon size-6 cursor-pointer hover:scale-105 hover:opacity-80"
                    />
                </p>
                <p class="orbitron font-black text-xl md:text-2xl text-main" >{{userData.daily_prizes_received || 0}} / {{userData.daily_prizes_total || 0}}</p>
            </div-->
            <div>
                <p>Played</p>
                <p class="orbitron font-black text-xl md:text-2xl text-main" >{{userData.plays || 0}}</p>
            </div>
            <div>
                <p>Won</p>
                <p class="orbitron font-black text-xl md:text-2xl text-main" >
                    {{userData.wins || 0}}
                    <span class="text-sm font-bold text-white" >{{userData.wins_persent || 0}}%</span>
                </p>
            </div>
            <div>
                <p>Lost</p>
                <p class="orbitron font-black text-xl md:text-2xl text-main" >
                    {{userData.losses || 0}}
                    <span class="text-sm font-bold text-white" >{{userData.losses_persent || 0}}%</span>
                </p>
            </div>
        </div>
    </div>

</template>
