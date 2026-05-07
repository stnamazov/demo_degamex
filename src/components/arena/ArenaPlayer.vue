<script setup>

    import axios from "axios"
    import { ref, watch, computed, defineEmits, onMounted } from 'vue'
    import { useStore } from 'vuex'
	import Loading from '@/components/Loading.vue'
	import Icon from '@/components/Icon.vue'
	import Button from "@/components/Button.vue"
	import ArenaDegamer from "@/components/arena/ArenaDegamer.vue"
	import { isDemo } from '@/demo/demo.js'

	const store = useStore()

    const isConnecting = computed(() => store.getters.isConnecting)
    const authToken = computed(() => store.getters.authToken)
    const address = computed(() => store.getters.address)
	const degamers = computed(() => store.getters.degamers)
	const activeDegamer = computed(() => store.getters.activeDegamer)

	const emit = defineEmits(['joinArena'])
	const props = defineProps({
		timer: String,
		isJoining: Boolean,
		currentStatus: String,
	})

    const isLoading = ref(false)
    const tokenData = ref(false)
	const isDailyClue = ref(false)

    async function getTokenData(){
        
        if (isDemo) {
			// minimal fields used in template
			tokenData.value = {
				tier: degamers.value.length > 0 ? 'RARE' : 'BASE',
				next_level_up: 10,
				total_claimed_lotboxes: 3,
				claimed_daily_lotboxes: 1,
				daily_lotboxes: 3,
				today_plays_without_token: 0,
			}
			isLoading.value = false
			return
		}

        if (authToken){
            isLoading.value = true
            const tokenDataRes = await axios.post(`${import.meta.env.VITE_API_URL}/v1/arena/get_token_data`,{
				address: address.value,
				authToken: authToken.value,
				tokenId: activeDegamer.value
			})
            
            tokenData.value = tokenDataRes.data.result
            isLoading.value = false
        }

    }

    watch(authToken, async () => { await getTokenData() }, { immediate: true })
    watch(activeDegamer, async () => { await getTokenData() }, { immediate: true })

	onMounted(() => {

	})

</script>

<template>

	<div v-if="isLoading" class="flex flex-col items-center text-center">
		<Loading class="w-[50px]" />
	</div>
	
	<div v-else class="flex flex-col items-center text-center px-10">

		<div class="w-full flex flex-col items-center">
			
			<div v-if="degamers.length > 0 && !props.isJoining && tokenData" class="flex flex-col items-center">
				<p class="orbitron text-3xl w-full mb-0">#{{ activeDegamer }}</p>
				<p class="flex items-center justify-center gap-2 orbitron text-sm">
					<Icon v-if="tokenData.tier == 'BASE'" type="common" color="#888" class="icon size-4" />
					<Icon v-if="tokenData.tier == 'RARE'" type="rare" class="icon size-4" />
					<Icon v-if="tokenData.tier == 'EPIC'" type="common" class="icon size-4" />
					<span class="uppercase" >{{tokenData.tier}}</span>
				</p>
				<div v-if="parseInt(tokenData.next_level_up) > 0" class="flex flex-col relative" >
					<span class="w-[120px] orbitron text-[10px] absolute">{{parseInt(tokenData.total_claimed_lotboxes)}} / {{parseInt(tokenData.next_level_up)}}</span>
					<div class="w-[120px] border h-4 rounded-sm overflow-hidden flex">
						<div class="bg-main/70 h-full" :style="`width: ${100 / parseInt(tokenData.next_level_up) * parseInt(tokenData.total_claimed_lotboxes)}%;`"></div>
					</div>
				</div>
			</div>
			
			<p v-else-if="!props.isJoining">You don't have any Degamers NFTs yet</p>

			<div v-if="props.isJoining" class="flex flex-col items-center w-full text-center h-[100px]">
				<p class="orbitron text-5xl w-full font-black text-main">{{ timer ? timer : ''}}</p>
				<p>{{props.currentStatus}}</p>
			</div>

			<div v-if="!props.isJoining" class="flex items-center gap-3 mt-4" >
				<span class="orbitron font-black text-xl md:text-2xl text-main" >{{tokenData.claimed_daily_lotboxes}} / {{tokenData.daily_lotboxes}}</span>
				<Icon type="lootbox" class="icon size-6" />
			</div>

			<div v-if="degamers.length > 0" class="w-full flex items-center justify-center">
				<Icon v-if="!props.isJoining" type="prev" class="icon size-8" @click="store.dispatch('setActiveDegamer', 'prev'); dailyClue =  false" :class="{ disabled: degamers.length < 2 }" />
				<ArenaDegamer :id="activeDegamer" class="w-full max-w-[200px] max-h-[200px]" />
				<Icon v-if="!props.isJoining" type="next" class="icon size-8" @click="store.dispatch('setActiveDegamer', 'next'); dailyClue =  false" :class="{ disabled: degamers.length < 2 }" />
			</div>
			<div v-else class="w-full flex items-center justify-center">
				<ArenaDegamer :id="'dummy'" class="w-full max-w-[200px] max-h-[200px]" />
			</div>

		</div>

		<Button :text="props.isJoining ? 'Searching...' : 'Join arena'" @click="emit('joinArena')" stroke="#FAFF00" fill="" :width="250" :class="{ disabled: props.isJoining || tokenData.today_plays_without_token >= 3 }" />
		<RouterLink v-if="degamers.length == 0" to="/mint" class="mt-2"><Button :text="`Mint NFT`"  stroke="#FAFF00" fill="" :width="250" :class="{ disabled: props.isJoining }" /></RouterLink>

	</div>

</template>
