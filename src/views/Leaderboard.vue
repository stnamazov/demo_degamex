<script setup>
import { useStore } from 'vuex'
import { computed, watch, ref, onMounted } from 'vue'
import { isDemo, demoLeaderboard } from '@/demo/demo.js'

import Loading from '@/components/Loading.vue'
import Icon from '@/components/Icon.vue'
import Button from "@/components/Button.vue"
import DClue from '@/components/_ui/DClue.vue'
import DWrapper from "@/components/DWrapper.vue"
import Modal from "@/components/Modal.vue"
import LootboxesCanvas from '@/components/lootbox/LootboxesCanvas.vue'

const store = useStore()

const isConnecting = computed(() => store.getters.isConnecting)
const authToken = computed(() => store.getters.authToken)
const address = computed(() => store.getters.address)

const isLoading = ref(false)
const leaderboard = ref(false)

async function getLeaderboard(pageNumber){
        
    if (isDemo) {
        leaderboard.value = demoLeaderboard(pageNumber)
        isLoading.value = false
        return
    }

}

watch(authToken, async () => { await getLeaderboard(1) }, { immediate: true })

</script>

<template>
    <div class="container flex items-center" :class="{'justify-center': isLoading}">
        <Loading v-if="isLoading" class="m-auto w-[100px]" />
        <div v-else>
            <p class="text-3xl text-main font-black orbitron text-center mb-8" >Leaderboard</p>
            <DWrapper class="mb-5">
                <div class="px-10">
                    <div class="flex gap-5 text-main mb-4">
                        <span class="w-20">Rank</span>
                        <span class="w-[200px]">User</span>
                        <!--span class="w-[100px] hidden md:flex">Played</span>
                        <span class="w-[100px] hidden md:flex">Won</span>
                        <span class="w-[100px] hidden md:flex">Lost</span-->
                        <!--span class="w-[100px] ml-auto text-right" >+/- in 24H</span-->
                        <span class="w-[200px] ml-10 text-right" >Epoch 2 Points</span>
                    </div>
                    <div v-if="!isLoading && leaderboard.list">
                        <div v-for="(user, index) in leaderboard.list" v-bind:key="index" class="h-7 flex gap-5 mb-1 md:text-[18px] hover:bg-black/20" :class="{'text-main': user.address == address}" >
                            <span class="w-20" >{{index + 1 + leaderboard.offset}}</span>
                            <span class="w-[200px]">{{ user.address == address ? '[ YOU ]' : user.address.substr(0,4) + "..." + user.address.substr(-4) }}</span>
                            <!--span class="w-[100px] hidden md:flex">{{user.plays}}</span>
                            <span class="w-[100px] hidden md:flex">{{user.wins}}</span>
                            <span class="w-[100px] hidden md:flex">{{user.losses}}</span-->
                            <!--span class="w-[100px] ml-auto text-right" :class="user.recent_win_points > 0 ? 'text-lime-500' : (user.recent_win_points < 0 ? 'text-red-500' : 'text-white')">{{ user.recent_win_points > 0 ? `+${user.recent_win_points}` : user.recent_win_points }}</span-->
                            <span class="w-[200px] ml-10 text-right text-xl font-bold">{{user.points}}</span>
                        </div>
                    </div>
                    <div v-else>
                        <div v-for="(i, index) in 15" v-bind:key="index" class="h-7 bg-black/20 mb-1 rounded-md animate-pulse" ></div>
                    </div>
                    <div class="flex gap-2 mt-10 justify-center">
                        <button @click="getLeaderboard(leaderboard.current - 1)" :class="{'pointer-events-none opacity-60': !leaderboard.list || leaderboard.current == 1 }" class="flex items-center justify-center p-2 rounded-md bg-black/20 text-sm text-main" >Prev</button>
                        <button @click="getLeaderboard(leaderboard.current + 1)" :class="{'pointer-events-none opacity-60': !leaderboard.list || (leaderboard.list && leaderboard.current == leaderboard.pages) }" class="flex items-center justify-center p-2 rounded-md bg-black/20 text-sm text-main" >Next</button>
                    </div>
                </div>
            </DWrapper>
        </div>
    </div>
</template>