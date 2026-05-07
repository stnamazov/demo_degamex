<script setup>
import axios from "axios"
import { computed, watch, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import Loading from '@/components/Loading.vue'
import Icon from '@/components/Icon.vue'
import DButton from "@/components/_ui/DButton.vue"
import DInput from "@/components/_ui/DInput.vue"
import DClue from '@/components/_ui/DClue.vue'
import DWrapper from "@/components/DWrapper.vue"
import Modal from "@/components/Modal.vue"
import LootboxesCanvas from '@/components/lootbox/LootboxesCanvas.vue'
import { isDemo, getDemoState } from '@/demo/demo.js'
import d1 from '@/assets/nft/d1.svg'
import d4 from '@/assets/nft/d4.svg'
import d7 from '@/assets/nft/d7.svg'
import d12 from '@/assets/nft/d12.svg'
import d19 from '@/assets/nft/d19.svg'

const CDN = import.meta.env.VITE_DEGAMEX_CDN

const router = useRouter()

const store = useStore()
const isConnecting = computed(() => store.getters.isConnecting)
const address = computed(() => store.getters.address)
const authToken = computed(() => store.getters.authToken)
const degamers = computed(() => store.getters.degamers)
const activeDegamer = computed(() => store.getters.activeDegamer)

const isLoading = ref(false)
const isAccountDataLoading = ref(false)
const isClaiming = ref(false)
const resultLootbox = ref(false)
const accountData = ref(false)
const accountEpoch2Balance = ref(0)

const missionErrorMessage = ref(false)
const missionCustomCheck = ref(false)
const missionCustomCheckLink = ref(null)

const demoDegamerImages = [d1, d4, d7, d12, d19]

const getDegamerURL = (tokenId) => {
	if (isDemo) {
		return new URL('@/assets/spins-default-avatar.svg', import.meta.url).href
	}
	return `${import.meta.env.VITE_API_URL}/v1/degamers/image/${tokenId}`
}

const showLootboxResult = (result) => {
	resultLootbox.value = result
}

const getMission = (missionId) => {
	return accountData.value.missions.find(item => item.id === missionId)
}

async function getAccountData(silent){ 
    
	if (authToken && !isAccountDataLoading.value){

		if (isDemo) {
			if (!silent) { isAccountDataLoading.value = true }
			const demo = getDemoState()
			accountData.value = {
				balance_epoch1: demo.points || 0,
				balance_epoch2: demo.points || 0,
				x_username: 'demo_user',
				missions: [],
			}
			accountEpoch2Balance.value = accountData.value.balance_epoch2
			if (!silent) { isAccountDataLoading.value = false }
			return
		}

        if (!silent) { isAccountDataLoading.value = true }
        const accountDataRes = await axios.post(`${import.meta.env.VITE_API_URL}/v1/account/get_account_data`,{
            address: address.value,
            authToken: authToken.value
        })
		accountData.value = accountDataRes.data.result
		if (!silent) { isAccountDataLoading.value = false }

    }

}

async function completeMission(missionId, isCustomCheck){

	const mission = getMission(missionId)

	if ( mission.status == null && !isCustomCheck  ){
			
		if (mission.type == 'tweet'){
			mission.disabled = true
			window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(mission.condition)}`, "_blank")
			setTimeout(() => { 
				mission.status = 'posted'
				mission.cta = 'Check tweet'
				mission.disabled = false
			}, 2000)
		} else {
			router.push('/arena')
		}
		
	} else {
		
		if (isCustomCheck){

			mission.custom_chech_error = false

			const patternLink = /(?:twitter\.com\/|https?:\/\/(?:www\.)?twitter\.com\/|x\.com\/)(?:\w+\/status\/)?(\d+)/
			const link = missionCustomCheckLink.value ? missionCustomCheckLink.value : ''
			const matchLink = link.match(patternLink)
			if (matchLink == null){
				mission.custom_check_error = true
				setTimeout(() => { mission.custom_check_error = false }, 2000)
				return
			} else {
				missionCustomCheck.value = false
			}

		}

		mission.disabled = true
		mission.status = 'checking'
		const missionDataRes = await axios.post(`${import.meta.env.VITE_API_URL}/v1/account/check_mission`,{
			address: address.value,
			authToken: authToken.value,
			missionId: missionId,
			tweetLink: missionCustomCheckLink.value
		})
		
		if (missionDataRes.data.result == 'error_twitter_user'){
			missionErrorMessage.value = true
		}
		mission.status = missionDataRes.data.result
		mission.disabled = false

	}

}

async function claimMissionReward(missionId){
	
	const mission = getMission(missionId)
	mission.disabled = true
	mission.status = 'claiming'
	const claimMissionRewardRes = await axios.post(`${import.meta.env.VITE_API_URL}/v1/account/claim_mission_reward`,{
		address: address.value,
		authToken: authToken.value,
		missionId: missionId
	})
	if (claimMissionRewardRes.data.result == 'claimed'){
		await getAccountData()
	} else {
		mission.status = claimMissionRewardRes.data.result 
		mission.disabled = false
	}
	
}

async function cancelMission(missionId){
	
	const mission = getMission(missionId)
	missionCustomCheck.value = false
	mission.disabled = true
	mission.status = 'canceling'
	const cancelMissionRes = await axios.post(`${import.meta.env.VITE_API_URL}/v1/account/cancel_mission`,{
		address: address.value,
		authToken: authToken.value,
		missionId: missionId
	})
	if (cancelMissionRes.data.result){
		mission.disabled = false
		mission.status = null
	} else {
		await getAccountData()
	}

}

async function claim(){
	isClaiming.value = true
	await getAccountData(true)
	resultLootbox.value = false
	isClaiming.value = false
}

watch(authToken, async () => { await getAccountData() })
watch(accountData, async (newAccountData, oldAccountData) => { 
	// balance animation
	if (oldAccountData.balance_epoch2 && newAccountData.balance_epoch2){
		const diffBalance = newAccountData.balance_epoch2 - oldAccountData.balance_epoch2
		const diffAnimate = setInterval(() => {
			accountEpoch2Balance.value += parseInt(diffBalance / 50)
			if (accountEpoch2Balance.value >= newAccountData.balance_epoch2) {
				accountEpoch2Balance.value = newAccountData.balance_epoch2
				clearInterval(diffAnimate)
			}
		}, 10)
	} else {
		accountEpoch2Balance.value = newAccountData.balance_epoch2
	}
})

onMounted(async () => {
	if(authToken.value){ await getAccountData() }
})

</script>

<template>

	<div class="container flex items-center" :class="{'justify-center': isLoading || isAccountDataLoading}">

		<Loading v-if="isLoading || isAccountDataLoading" class="m-auto w-[100px]" />

		<div v-else>
			
			<div>

				<p class="text-3xl text-main font-black orbitron" >My account</p>
				<div class="flex items-center gap-5" >
					<span v-if="address" class="flex items-center" >
						{{ address.substr(0,4) + "..." + address.substr(-4) }}
					</span>
					<span v-if="accountData.x_username" class="flex items-center" >
						{{ "@" + accountData.x_username }}
					</span>
				</div>

				<div class="w-full flex flex-col lg:grid lg:grid-cols-3 gap-5">

					<div class="pt-10">
						<DWrapper type="type2" >
							<div class="flex flex-col items-center justify-center text-center px-6">
								<p class="flex items-center gap-3 text-2xl text-main orbitron mt-[-20px] mb-6 ml-4" >Lootboxes</p>
								<LootboxesCanvas @open="showLootboxResult" />
							</div>
						</DWrapper>
					</div>
					
					<div v-if="accountData" class="col-span-2 md:pt-10">

						<DWrapper class="mb-5" >
							<div class="px-10">
								<div class="flex flex-col md:grid md:grid-cols-3 gap-5 text-xl md:text-sm xl:text-xl">
									<div>
										<p class="flex items-center gap-3 mb-0" >
											Epoch 1 Points
											<Icon 
												type="q" 
												color="#FFFFFF" 
												class="icon size-5 cursor-pointer hover:scale-105 hover:opacity-80" 
												@click="store.dispatch('setModalMessage', `
													<p>During Epoch 1, the DeGamers earned points from the Spins and Alpha Arena. These points are securely stored and will be converted into [REDACTED]. For Epoch 2, points will also be converted in a similar manner; however, the method of acquiring these points differs, as they come from LootBoxes.</p>
													<p>All the spins that were not spinned before the Epoch 1, were automatically spinned and points were added to users’ balances.</p>
												`)"
												:class="false ? 'opacity-70' : 'opacity-30'" 
											/>
										</p>
										<p class="text-3xl text-main font-black orbitron mt-0">{{accountData.balance_epoch1}}</p>
									</div>
									<div>
										<p class="mb-0" >Epoch 2 Points</p>
										<p class="text-3xl text-main font-black orbitron mt-0">{{accountEpoch2Balance}}</p>
									</div>
									<div>
										<p class="flex items-center gap-3 mb-0" >
											Multiplier
											<!--Icon @click="store.dispatch('setModalMessage', `<p>Multiplier</p>`)" type="q" color="#FFFFFF" :class="false ? 'opacity-70' : 'opacity-30'" class="icon size-6 cursor-pointer hover:scale-105 hover:opacity-80" /-->
										</p>
										<p class="text-3xl text-main font-black orbitron mt-0">1x</p>
									</div>
								</div>
							</div>
						</DWrapper>

						<DWrapper class="mb-5">
						<div class="px-10">
							<p class="text-2xl text-main orbitron mb-4 text-center lg:text-left" >Missions</p>
							
							<!--div v-if="missionErrorMessage" class="text-xl md:text-sm xl:text-xl text-center lg:text-left">
								<p>This X / Twitter user has already completed this mission, connect another account and try again!</p>
								<DButton 
									class="text-sm" 
									text="Connect X" 
									stroke="#FAFF00" 
									:width="170" :height="36" 
								/>
							</div>

							<div v-else-if="!accountData.x_username" class="text-xl md:text-sm xl:text-xl text-center lg:text-left">
								<p>To complete the missions you need to connect X / Twitter</p>
								<DButton 
									class="text-sm" 
									text="Connect X" 
									stroke="#FAFF00" 
									:width="170" :height="36" 
								/>
							</div>

							<div v-else-if="accountData.missions.length > 0" class="flex flex-col py-5 lg:py-0 gap-5 lg:gap-3 text-xl md:text-sm xl:text-xl">
								<div v-for="mission of accountData.missions" v-bind:key="mission.id" class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:h-8">
							
									<div class="flex items-center justify-center lg:justify-start gap-2" >
										{{mission.title}}
										<Icon 
											v-if="mission.description"
											type="q" 
											color="#FFFFFF" 
											class="icon size-5 cursor-pointer hover:scale-105 hover:opacity-80"
											@click="store.dispatch('setModalMessage', mission.description)" 
											:class="false ? 'opacity-70' : 'opacity-30'" 
										/>
									</div>
									<div class="flex items-center justify-center lg:justify-start gap-5">
										<div class="flex justify-center gap-4 lg:justify-start ">
											<span v-for="reward of mission.rewards" v-bind:key="reward" class="">
												
												<div v-if="reward.type != 'multiplier'" class="flex items-center gap-1" >
													<img class="w-[25px]" :src="`${CDN}/media/${reward.type}.svg`" />
													<span>x</span>
													<span>{{reward.count}}</span>
												</div>
												<div v-else-if="reward.type = 'multiplier'">
													<span class="text-main font-black orbitron">+{{reward.count}}x</span>
												</div>

											</span>
										</div>
										<div v-if="!mission.status && mission.expires_in" class="flex items-center justify-center text-main orbitron lg:ml-auto">
											<VueCountdown :time="parseInt(mission.time)" v-slot="{ days, hours, minutes, seconds }" @end="console.log('end')" >
												{{ (days * 24) + hours }}:{{ minutes < 10 ? '0' + minutes : minutes  }}:{{ seconds < 10 ? '0' + seconds : seconds }}
											</VueCountdown>
										</div>
									</div>
									<div class="flex items-center justify-center">
										
										<DButton 
											v-if="mission.status == null || mission.status == 'posted'" 
											@click="completeMission(mission.id)" 
											:class="{'opacity-10 pointer-events-none': mission.disabled}" 
											:text="mission.cta ? mission.cta : 'Tweet & claim'" stroke="#FAFF00" 
											:width="170" :height="36" class="text-sm"
										/>
										
										<div v-else-if="mission.status == 'checking' || mission.status == 'canceling'" class="flex items-center gap-3" >
											<Icon type="loading" color="#FFFFFF" class="size-5 animate-spin" />
											<span class="capitalize" >{{mission.status}}...</span>
										</div>

										<DButton 
											v-else-if="mission.status == 'claiming'" 
											@click="claimMissionReward(mission.id)" 
											:class="{'opacity-10 pointer-events-none': mission.disabled}" 
											text="Сlaim" stroke="#FAFF00" 
											:width="170" :height="36" class="text-sm"
										/>

										<DButton 
											v-else-if="mission.status == 'tweet_not_found'" 
											@click="missionCustomCheck = getMission(mission.id)" 
											:class="{'opacity-10 pointer-events-none': mission.disabled}" 
											text="Custom check" stroke="#FFFFFF" 
											:width="170" :height="36" class="text-sm"
										/>
									
									</div>

								</div>
							</div-->
							<div class="text-xl md:text-sm xl:text-xl text-center lg:text-left">
								<!--p>You have completed all missions! New ones coming soon!</p-->
								<p>Coming soon!</p>
							</div>
						</div>
						</DWrapper>

						<DWrapper class="mb-5">
						<div class="px-10">
							<p class="text-2xl text-main orbitron mb-4 text-center lg:text-left" >Degamers</p>
							<div v-if="degamers.length > 0" class="grid grid-cols-2 md:grid-cols-5 gap-5">
								<div v-if="isDemo" v-for="(img, index) in demoDegamerImages" v-bind:key="index" class="flex flex-col items-center justify-center pointer-events-none select-none">
									<img class="w-full max-w-[200px] hover:scale-100" :src="img" />
								</div>
								<div v-else v-for="id in degamers" v-bind:key="id" class="flex flex-col items-center justify-center">
									<p class="orbitron text-xl w-full text-center">#{{ id }}</p>
									<RouterLink :to="`/degamers/${id}`" class="max-w-[200px] hover:scale-105">
										<img class="w-full" :src="getDegamerURL(id)" />
									</RouterLink>
									<!--p class="flex items-center justify-center gap-2 orbitron text-sm mb-1 mt-2">
										<Icon type="common" color="#888" class="icon size-4" />
										BASE
									</p>
									<div class="border h-2 rounded-md w-full">
										<div class="bg-main w-[45%] h-full"></div>
									</div>
									<RouterLink :to="`/arena/${id}`" class="text-sm mt-2">Join Arena</RouterLink-->
								</div>
							</div>
							<div v-else>
								<p>You don't have any skins available for this Degamer yet</p>
								<RouterLink to="/mint">Mint Degamers NFT</RouterLink>
							</div>
						</div>
						</DWrapper>
						
					</div>

				</div>

			</div>

			<Modal v-if="resultLootbox" @modal-close="claim()">
				<div class="flex items-center justify-center gap-5" >

					<div v-for="(loot, index) in resultLootbox" v-bind:key="index" class="w-[200px]">
						<img class="w-full" src="@/assets/lootbox/lootbox-result-points.svg" />
						<p class="orbitron text-sm uppercase" ><span class="text-2xl text-main font-black mr-2" >{{loot.value}}</span>x {{loot.title}}</p>
					</div>

				</div>
				<DButton @click="claim()" :text="isClaiming ? 'Claiming...' : 'Claim'" stroke="#FFFFFF" class="mt-6" :class="{'disabled': isClaiming}" />
			</Modal>

			<Modal v-if="missionCustomCheck" @modal-close="missionCustomCheck = false">
				
				<p class="text-bold text-main orbitron" >Checking: {{missionCustomCheck.title}}</p>
				<p>We couldn't find your tweet. Perhaps something went wrong. Send a link to the tweet to re-check or click the "Cancel checking" to re-tweet.</p>
				<p>Make sure you tweeted from a <b>@{{accountData.x_username}}</b></p>

				<div class="flex items-center justify-center gap-3 my-5">
					<div class="relative flex items-center justify-center">
						<DInput 
							text="Enter link to post" 
							@input-change="(link) => missionCustomCheckLink = link"
							:width="360" :height="42" 
						/>
						<span v-if="missionCustomCheck.custom_check_error" class="text-red-500 text-sm absolute right-5">
							Bad link!
						</span>
					</div>
					<DButton 
						@click="completeMission(missionCustomCheck.id, true)"
						text="Verify" 
						stroke="#FAFF00" 
						class="text-sm" 
						:width="170" :height="42"
					/>
				</div>

				<span @click="cancelMission(missionCustomCheck.id)" class="uppercase text-sm orbitron cursor-pointer" >Cancel checking</span>

			</Modal>


		</div>

	</div>
	
</template>