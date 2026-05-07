<script setup>
	import axios from "axios"
	import { defineProps, ref } from 'vue'
	const props = defineProps({
		tokenId: Number
	})

	const imageUrl = ref(`${import.meta.env.VITE_API_URL}/v1/degamers/image/${props.tokenId}`)

</script>

<template>
	<div class="token">
		<div class="token-image">
			<!--svg viewBox="0 0 258 258" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M0 6.49428V251.506L6.49428 258H251.506L258 251.506V6.49428L251.506 0H6.49428L0 6.49428ZM33.5 6L6 33.5L6.49428 44.4943L13 51V88.9943L6.49428 95.5V242.5L15.5 251.506H225.5L251.506 225.5V31.0057L234.5 14H196.5L188 22.5H156.5L140 6H33.5Z" fill="black"/>
				<path d="M156.145 21.9614L156.73 22.5472H157.559H187.496H188.325L188.91 21.9614L196.625 14.2464H234.226L252 32.0201V225.789L225.627 252H16.115L6 241.947V95.3558L11.7619 89.5939L12.3477 89.0081V88.1797V51.6562V50.8278L11.7619 50.242L6 44.4802V33.1085L33.2761 6H140.183L156.145 21.9614Z" stroke="white" stroke-width="3"/>
			</svg-->
			<RouterLink :to="`/degamers/${props.tokenId}`"><img :src="imageUrl" /></RouterLink>
		</div>
		<p class="token-name" >DEGAMER {{ props.tokenId }}</p>
	</div>
</template>

<style>
	.token{
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		max-width: 420px;	
	}
	.token-image{
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		transition: all 0.2s;
	}
	.token-image:hover{
		transform: scale(1.05);
	}
	.token-image svg, .token-image img{
		width: 100%;
	}
	.token-image svg{
		position: absolute;
	}
	.token-name{
		font-family: var(--font-orbitron);
		text-align: center;
		margin-top: 10px;
	}


</style>
