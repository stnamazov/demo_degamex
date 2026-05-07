<script setup>
	import { reactive, watch, onMounted } from 'vue'
	import Loading from '@/components/Loading.vue'
	import DWrapper from "@/components/DWrapper.vue"
	import Button from "@/components/Button.vue"
	import InputNum from "@/components/InputNum.vue"
	import Icon from "@/components/Icon.vue"
	import Modal from "@/components/Modal.vue"
	import { getDemoState, setDemoState } from '@/demo/demo.js'

	const state = reactive({ 
		isLoading: true,
		isConnected: true,
		address: null,
		mintCount: 1,
		mintLimit: 5,
		mintPrice: 0.05,
		maxSupply: 2000,
		totalSupply: 1337,
		isModalOpen: false,
		modalData: {
			title: 'Demo mint',
			text: 'This is a demo. No wallet / blockchain transaction is performed.',
			tx: ''
		},
		mintError: false
	})

	onMounted(() => {
		const demo = getDemoState()
		state.address = demo.address
		state.isLoading = false
	})

	watch(state.mintCount, (newValue, oldValue) => {

		state.mintError = false

		console.log(newValue, oldValue)
		if (newValue > mintLimit) {
			state.mintCount = state.mintLimit;
		} else if (newValue < 1){
			state.mintCount = 1;
		}

	})

	const mint = async () => {

		try {

			state.isLoading = true
			state.mintError = false

			if (state.mintCount > state.mintLimit) {
				state.mintCount = state.mintLimit;
			} else if (state.mintCount < 1){
				state.mintCount = 1;
			}

			state.totalSupply = Math.min(state.maxSupply, state.totalSupply + state.mintCount)
			setDemoState({ points: (getDemoState().points || 0) + 100 * state.mintCount })

			state.modalData = {
				title: 'Demo mint complete',
				text: `Minted ${state.mintCount} NFT(s) in demo mode. No wallet / tx.`,
				tx: ''
			}
			state.isModalOpen = true
			state.isLoading = false
			
		} catch (e) {

			if (e instanceof Error) {
				console.log(e)
				if (e.message.includes('Sale end')) {
					state.mintError = 'Error: Sale end';
				} else if (e.message.includes('Public sales is closed')){
					state.mintError = 'Error: Public sales is closed'
				} else if (e.message.includes('Exceeds MAX limit')){
					state.mintError = 'Error: Exceeds MAX limit'
				} else if (e.message.includes('Exceeds address limit')){
					state.mintError = 'Error: Exceeds address limit'
				} else if (e.message.includes('Exceeds TX limit')){
					state.mintError = 'Error: Exceeds TX limit'
				} else if (e.message.includes('Invalid proof')){
					state.mintError = 'Error: Invalid proof'
				} else if (e.message.includes('Value below price') || e.message.includes('transaction exceeds the balance') ){
					state.mintError = 'Error: Value below price'
				}

			}

			state.isLoading = false

		}
	}

	


	
</script>

<template>
	<div class="mint-control">
	
		<svg viewBox="0 0 485 38" fill="none" xmlns="http://www.w3.org/2000/svg">

			<path d="M450.255 0L485.309 35.1243V344.647L475.099 354.877H397.844L376.744 333.735H218.831L194.668 357.946H102.676L94.2925 349.563H15.8289L0 333.735V23.1888L23.1424 0H450.255Z" fill="#FAFF00"/>
			<path d="M299.481 350.133L310.343 338.412H296.766L285.904 350.133H299.481Z" fill="white"/>
			<path d="M280.473 350.133L291.335 338.412H277.758L266.896 350.133H280.473Z" fill="white"/>
			<path d="M261.465 350.133L272.327 338.412H258.75L247.888 350.133H261.465Z" fill="white"/>
			<path d="M242.457 350.133L253.319 338.412H239.742L228.88 350.133H242.457Z" fill="white"/>
			<path d="M223.449 350.133L234.311 338.412H220.734L209.872 350.133H223.449Z" fill="white"/>
			<path d="M385.357 350.133H304.912L315.774 338.412H374.043L385.357 350.133Z" fill="white"/>

		</svg>

		<div class="mint-control-body">

			<Loading v-if="state.isLoading" color1="#000" color2="#000" />
			
			<div v-else @click="state.mintError = false">
				<div class="mint-check-eligible-status">
					Mint <span class="eligible">DEMO</span>
				</div>
				<p class="mint-supply">{{state.totalSupply}} / {{state.maxSupply}}</p>
				<div>
					<div class="mint-input">
						<Button text="-" stroke="#000" :width="60" :class="{'disabled':state.mintCount <= 1}" @click="state.mintCount--" />
						<div class="mint-input-qty">
							<input type="number" min=1 :max="state.mintLimit" v-model="state.mintCount" />
							<InputNum :width="150" stroke="#000" />
						</div>
						<Button text="+" stroke="#000" :width="60" :class="{'disabled':state.mintCount == state.mintLimit}" @click="state.mintCount++" />
					</div>
					<Button :text="`Mint for ${(state.mintPrice * state.mintCount).toFixed(2)} ETH`" stroke="#000" :width="300" @click="mint()"/>
					<p v-if="state.mintError" class="mint-error">{{state.mintError}}</p> 

					<p class="mint-check-address" >{{ state.address.substr(0,4) + "..." + state.address.substr(-4) }}</p>
				</div>
			</div>

		</div>

		<svg viewBox="0 0 485 38" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M450.255 -320L485.309 -284.876V24.6469L475.099 34.8773H397.844L376.744 13.7346H218.831L194.668 37.9464H102.676L94.2925 29.5634H15.8289L0 13.7346V-296.811L23.1424 -320H450.255Z" fill="#FAFF00"/>
			<path d="M299.481 30.1326L310.343 18.4119H296.766L285.904 30.1326H299.481Z" fill="white"/>
			<path d="M280.473 30.1326L291.335 18.4119H277.758L266.896 30.1326H280.473Z" fill="white"/>
			<path d="M261.465 30.1326L272.327 18.4119H258.75L247.888 30.1326H261.465Z" fill="white"/>
			<path d="M242.457 30.1326L253.319 18.4119H239.742L228.88 30.1326H242.457Z" fill="white"/>
			<path d="M223.449 30.1326L234.311 18.4119H220.734L209.872 30.1326H223.449Z" fill="white"/>
			<path d="M385.357 30.1326H304.912L315.774 18.4119H374.043L385.357 30.1326Z" fill="white"/>
		</svg>

		<Modal v-if="state.isModalOpen" @modal-close="state.isModalOpen = false" class="modal">
			<p class="title">{{state.modalData.title}}</p>
			<p>{{state.modalData.text}}</p>
			<Button @click="state.isModalOpen = false" text="OK" stroke="#FFFFFF" />
		</Modal>

	</div>
</template>

<style scoped>
	
	.mint-price{
		margin-bottom: 20px;
		font-family: var(--font-orbitron);
		display: inline-block;
		/*border-top: 6px solid rgb(255, 255, 255);*/
		padding-top: 20px;
	}
	.mint-control{
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 20px;
		height: auto;
	}
	.mint-control .title{
		color: black;
		font-size: 24px;
		margin-bottom: 30px;
	}
	.mint-control a{
		color: black;
	}
	.mint-control-body{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 10px 30px;
		text-align: center;
		width: 100%;
		margin: 0 auto;
		background: var(--main-color);
		min-height: 350px;
		color: black;
	}
	.mint-check-address{
		font-family: var(--font-orbitron);
		font-size: 20px;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: -5px;
		margin-top: 20px;
	}
	.mint-check-disconnect{
		display: inline-block;
		font-family: var(--font-orbitron);
		background: none;
		border: none;
		margin-bottom: 20px;
	}
	.mint-supply{
		font-size: 24px;
		font-weight: bold;
		margin-top: 30px;
		font-family: var(--font-orbitron);
	}
	.mint-input{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 290px;
		margin: 0 auto;
		margin-bottom: 15px;
		margin-top: 20px;
	}
	.mint-input-qty{
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	.mint-input-qty input{
		position: absolute;
		z-index: 1;
		border: none;
		background: none;
		position: absolute;
		font-size: 24px;
		font-weight: bold;
		text-align: center;
		padding: 10px 20px;
		outline: none;
		width: 100%;
		color: black;
		font-family: var(--font-orbitron);
	}

	.connect-button{
		margin-top: 20px;
	}
	.mint-check-eligible{
		margin-bottom: 30px;
	}
	.mint-check-eligible-status{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-bottom: 30px;
		font-weight: 900;
		font-size: 32px;
		text-transform: uppercase;
		font-family: var(--font-orbitron);
	}
	.label{
		width: 130px;
		font-weight: bold;
	}
	.eligible, .not-eligible, .mint-error{
		display: inline-block;
		border-radius: 6px;
		padding: 7px 15px;
		background: #0f9600;
		color: white;
	}
	.not-eligible, .mint-error{
		background: rgb(221, 2, 2);
	}

	.mint-error{
		font-size: 16px;
	}

	.modal a{
		color: var(--main-color);
		margin-top: 10px;
		margin-bottom: 20px;
		display: block;
	}
	.tx {
		word-break: break-all;
		max-width: 480px;
		margin: 0 auto;
		font-size: 16px;
	}

	.links{
		margin-bottom: 30px;
		display: flex;
		align-items: center;
	}
	.links .icon{
		width: 36px;
		margin: 0 10px;
	}

	@media (max-width: 768px) {
		.mint-control-body{
			padding: 30px 20px;
		}
		.mint-price{
			font-size: 16px;
			margin: 10px;
			min-width: 200px;
			padding: 0;
			display: block;
		}
	}


</style>