<script setup>

    import axios from "axios"
    import { ref, watch, computed } from 'vue'
    import { useStore } from 'vuex'
    import { isDemo, demoLeaderboard } from '@/demo/demo.js'

    const store = useStore()

    const isConnecting = computed(() => store.getters.isConnecting)
    const authToken = computed(() => store.getters.authToken)
    const address = computed(() => store.getters.address)

    const isLoading = ref(true)
    const leaderboard = ref(false)

    async function getLeaderboard(pageNumber){
        
        if (isDemo) {
            leaderboard.value = demoLeaderboard(pageNumber)
            isLoading.value = false
            return
        }

        if (authToken){
            isLoading.value = true
            const leaderboardDataRes = await axios.post(`${import.meta.env.VITE_API_URL}/v1/arena/get_leaderboard`, {
                address: address.value,
                authToken: authToken.value,
                page: pageNumber
            })
            
            leaderboard.value = leaderboardDataRes.data.result
            isLoading.value = false
        }

    }

    watch(authToken, async () => { await getLeaderboard(1) }, { immediate: true })

</script>

<template>

    <div>
        <div class="px-5 md:px-14">
            <p class="orbitron font-black text-2xl text-main uppercase mb-5" >Leaderboard</p>
            <div class="flex gap-5 text-sm text-main mb-4">
                <span class="w-10">Rank</span>
                <span class="w-[150px]">User</span>
                <span class="w-[60px] hidden md:flex">Played</span>
                <span class="w-[60px] hidden md:flex">Won</span>
                <span class="w-[60px] hidden md:flex">Lost</span>
                <span class="w-[100px] ml-auto text-right" >+/- in 24H</span>
                <span class="w-[100px] text-right" >Total W/L</span>
            </div>
            <div v-if="!isLoading && leaderboard.list">
                <div v-for="(user, index) in leaderboard.list" v-bind:key="index" class="h-7 flex gap-5 mb-1 text-sm md:text-[18px] hover:bg-black/20" :class="{'text-main': user.address == address}" >
                    <span class="w-10" >{{index + 1 + leaderboard.offset}}</span>
                    <span class="w-[150px]">{{ user.address == address ? '[ YOU ]' : user.address.substr(0,4) + "..." + user.address.substr(-4) }}</span>
                    <span class="w-[60px] hidden md:flex">{{user.plays}}</span>
                    <span class="w-[60px] hidden md:flex">{{user.wins}}</span>
                    <span class="w-[60px] hidden md:flex">{{user.losses}}</span>
                    <span class="w-[100px] ml-auto text-right" :class="user.recent_win_points > 0 ? 'text-lime-500' : (user.recent_win_points < 0 ? 'text-red-500' : 'text-white')">{{ user.recent_win_points > 0 ? `+${user.recent_win_points}` : user.recent_win_points }}</span>
                    <span class="w-[100px] text-right">{{user.win_points}}</span>
                </div>
            </div>
            <div v-else>
                <div v-for="(i, index) in 15" v-bind:key="index" class="h-7 bg-black/20 mb-1 rounded-md animate-pulse" ></div>
            </div>
            <div class="flex gap-2 mt-10">
                <button @click="getLeaderboard(leaderboard.current - 1)" :class="{'pointer-events-none opacity-60': !leaderboard.list || leaderboard.current == 1 }" class="flex items-center justify-center p-2 rounded-md bg-black/20 text-sm text-main" >Prev</button>
                <button @click="getLeaderboard(leaderboard.current + 1)" :class="{'pointer-events-none opacity-60': !leaderboard.list || (leaderboard.list && leaderboard.current == leaderboard.pages) }" class="flex items-center justify-center p-2 rounded-md bg-black/20 text-sm text-main" >Next</button>
            </div>
        </div>
    </div>

</template>
