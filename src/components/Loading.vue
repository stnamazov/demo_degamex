<script setup>
	import { defineProps } from 'vue'
	const props = defineProps({
		color1: {
			type: String,
			default: '#FAFF00'
		},
		color2: {
			type: String,
			default: '#FFFFFF'
		}
	})

</script>

<template>
	<div class="loading_circle">
		<svg class="loading_circle1" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M37.5 0C27.1447 0 17.7697 4.19733 10.9835 10.9835L18.7617 18.7617C23.5572 13.9661 30.1822 11 37.5 11V0Z" :fill="color1"/>
		<path d="M75 37.5C75 47.8553 70.8027 57.2303 64.0165 64.0165L56.2383 56.2383C61.0339 51.4428 64 44.8178 64 37.5C64 30.1822 61.0339 23.5572 56.2383 18.7617L64.0165 10.9835C70.8027 17.7697 75 27.1447 75 37.5Z" :fill="color1"/>
		<path d="M37.5 75C27.1447 75 17.7697 70.8027 10.9835 64.0165C4.19733 57.2303 0 47.8553 0 37.5H11C11 44.8178 13.9661 51.4428 18.7617 56.2383C23.5572 61.0339 30.1822 64 37.5 64V75Z" :fill="color1"/>
		</svg>

		<svg class="loading_circle2" viewBox="0 0 93 93" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path fill-rule="evenodd" clip-rule="evenodd" d="M46.792 2.66162C42.7936 2.66162 38.9214 3.19468 35.2416 4.19304L34.7179 2.26282C38.5668 1.21857 42.6152 0.661621 46.792 0.661621C72.1971 0.661621 92.792 21.2565 92.792 46.6616H90.792C90.792 22.3611 71.0925 2.66162 46.792 2.66162ZM12.9799 18.5041C6.61838 26.1347 2.79199 35.95 2.79199 46.6616C2.79199 70.9622 22.4915 90.6616 46.792 90.6616V92.6616C21.3869 92.6616 0.791992 72.0667 0.791992 46.6616C0.791992 35.4649 4.79366 25.2001 11.4438 17.2234L12.9799 18.5041Z" :fill="color2"/>
		</svg>

	</div>
</template>

<style scoped>
	.loading_circle {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 30px;
		max-width: 150px;
		position: relative;
	}
	.loading_circle .loading_circle1{
		animation: rotate 1s linear infinite;
		position: absolute;
		width: 80%;
	}
	.loading_circle .loading_circle2{
		animation: rotate 1.8s linear infinite alternate;
		width: 100%;
	}
</style>
