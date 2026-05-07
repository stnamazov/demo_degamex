<script setup>

	import "./style.css"
	import { initializeApp } from "firebase/app"
	import { getAnalytics } from "firebase/analytics"
	import { useRoute } from 'vue-router'
	import { useStore } from 'vuex'
	import { onMounted, computed } from 'vue'
	import AppHeader from '@/components/_layout/AppHeader.vue'
	import AppFooter from '@/components/_layout/AppFooter.vue'
	import MintNotification from "@/components/MintNotification.vue"
	import DModal from "@/components/_ui/DModal.vue"

	const route = useRoute()
	const store = useStore()

	const isScreen = computed(() => store.getters.isScreen)
	const modalMessage = computed(() => store.getters.modalMessage)

</script>

<template>

	<div class="wrapper" :class="{screen: isScreen}">
		<AppHeader v-if="!isScreen" class="header" />
		<RouterView class="content" />
		<AppFooter v-if="!isScreen" class="footer mt-auto" :class="{ low: route.name == 'account' || route.name == 'mint' || route.name == 'arena' || route.name == 'degamers-of-owner' }" />
		<!--MintNotification v-if="route.name != 'account' && route.name != 'mint' && route.name != 'arena' && route.name != 'degamers-of-owner' && !isScreen" /-->
		<DModal v-if="modalMessage" @modal-close="store.dispatch('setModalMessage', null)">
			<div v-html="modalMessage"></div>
		</DModal>
	</div>

</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Orbitron:wght@400..900&display=swap');
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
	font-family: "Montserrat", sans-serif;
	font-weight: 500;
	font-size: 20px;
	color: #ffffff;
	background: #222324 url('@/assets/background.svg');
	animation: bg 1s linear infinite;
}

.wrapper{
	display: flex;
	flex-direction: column;
	justify-items: stretch;
	align-items: center;
	width: 100%;
	min-height: 100vh;
	margin: 0 auto;
	padding: 0 30px;
	overflow: hidden;
}
.wrapper.screen{
	margin: 0;
	padding: 0;
}

.content{
	width: 100%;
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-items: stretch;
	position: relative;
}

@keyframes bg {
	0%{ background-position-y: 10px; }
	100%{ background-position-y: 0px; }
}

:root {
	--main-color: #FAFF00;
	--font-orbitron: "Orbitron", sans-serif;
	--title: "Orbitron", sans-serif;
}
h1, h2, h3, a{ color: var(--main-color);}
a, button{ cursor: pointer; }
.title{
	color: var(--main-color);
	font-size: 32px;
	font-weight: 900;
	font-family: "Orbitron", sans-serif;
	text-transform: uppercase;
	margin-bottom: 30px;
}
.font-orbitron, .font-orbitron *{
	font-family: "Orbitron", sans-serif;
}

.orbitron { font-family: "Orbitron", sans-serif; }

w3m-modal{ z-index: 2000; }

.login{
	text-align: center;
	max-width: 520px;
}
.login img{
	width: 100%;
}
.login .title{
	font-size: 26px;
}
.login p{
	max-width: 360px;
	margin: 0 auto;
}

.button{
	display: flex;
	align-items: center;
	justify-content: center;
	text-decoration: none;
	text-transform: uppercase;
	font-weight: bold;
	font-size: 18px;
	position: relative;
	width: 250px;
	height: 65px;
	background: none;
	border: none;
	padding: 0 10px;
	text-align: center;
	cursor: pointer;
}
.button-bg{
	background-size: contain;
	position: absolute;
	width: 250px;
	height: 65px;
}
.button-black{
	color: black;
}
.button-black .button-bg{
	background: url('@/assets/btn-black-outline.svg') no-repeat center center;
	background-size: 100%;
}
.button-green{
	color: #FAFF00;
}
.button-green .button-bg{
	background: url('@/assets/btn-green-outline.svg') no-repeat center center;
	background-size: 100%;
}
.button-white{
	color: #ffffff;
}
.button-white .button-bg{
	background: url('@/assets/btn-green-outline.svg') no-repeat center center;
	background-size: 100%;
}

.button:hover{
	color: #ffffff;
}
.button:hover .button-bg{
	background: url('@/assets/btn-white-outline.svg') no-repeat center center;
	background-size: 100%;
}

ul{
	margin-top: 20px;
}
li{
	list-style: none;
	padding-left: 30px;
	background: url('@/assets/li.svg') no-repeat left center;
}

.disabled{
	opacity: 0.4;
	pointer-events: none;
}

.loading-min{
	animation: rotate 1.8s linear infinite alternate;
}

.qborder{
	background: url('@/assets/active-bottom-left.svg') no-repeat bottom left, url('@/assets/active-bottom-right.svg') no-repeat bottom right, url('@/assets/active-top-left.svg') no-repeat top left, url('@/assets/active-top-right.svg') no-repeat top right;
	padding: 10px 20px;
}

.footer.low{
	margin-bottom: -100px;
}

/* ---------------- animations ---------------- */

@keyframes rotate {
	0%{ transform: rotate(0deg); }
	100%{ transform: rotate(359deg); }
}

@keyframes blind {
	0%{ opacity: 0.5; }
	40%{ opacity: 0.3; }
	92%{ opacity: 0.5; }
	93%{ opacity: 0.3; }
	95%{ opacity: 0.7; }
	100%{ opacity: 0.5; }
}
@keyframes fly {
	0%{ top: 0px; }
	100%{top: 20px; }
}

@media (max-width: 768px) {
	body {
		font-size: 14px;
	}
}

</style>
