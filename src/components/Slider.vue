<script setup>
	import Icon from "@/components/Icon.vue"
	import Arena1Screen from "@/assets/arena1.jpg"
	import Arena2Screen from "@/assets/arena2.jpg"
	import Arena3Screen from "@/assets/arena3.jpg"
	import Arena4Screen from "@/assets/arena4.jpg"
	import { ref, defineProps } from 'vue'

	const slides = [
		Arena3Screen,
		Arena4Screen,
		Arena1Screen,
		Arena2Screen,
	]

	const slideIndex = ref(1)

	const changeSlide = ( action ) => {
		const maxSlides = slides.length
		if (action == 'prev'){
			if (slideIndex.value == 0){ slideIndex.value = maxSlides - 1 } else { slideIndex.value -= 1 }
		} else {
			if (slideIndex.value == maxSlides - 1){ slideIndex.value = 0 } else { slideIndex.value += 1 }
		}
	}

</script>

<template>
<div class="slider">

	<div class="slide" :style="`background-image: url(${slides[slideIndex]});`">
		<svg viewBox="0 0 519 250" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fill-rule="evenodd" clip-rule="evenodd" d="M5 0L0 5V245.5L5 250.5H514L519 245.5V5L514 0H5ZM417 20.5L402 5.5H22.5L7.5 20.5V233L16 241.5H183L202 222.5H316L335 241.5H503L511.5 233V33L499 20.5H417Z" fill="black"/>
			<path d="M413.898 18.2187L414.792 19.2162H416.132H496.784L513.488 35.7516V230.67L499.247 244.768H339.243L318.354 223.879L317.475 223H316.233H202.5H201.257L200.379 223.879L179.49 244.768H20.2415L6 230.67V20.8193L20.8609 6.10873L402.052 5.00389L413.898 18.2187Z" stroke="white" stroke-width="6"/>
			<path d="M418.684 12.6279L409 3H421.104L430.788 12.6279H418.684Z" fill="#FAFF00"/>
			<path d="M435.629 12.6279L425.946 3H454.996L464.679 12.6279H435.629Z" fill="#FAFF00"/>
			<path d="M469.52 12.6279L459.837 3H471.941L481.625 12.6279H469.52Z" fill="#FAFF00"/>
		</svg>
	</div>

	<div class="slider-control">
		<Icon type="prev" class="icon" @click="changeSlide('prev')"/>
		<Icon type="next" class="icon" @click="changeSlide('next')"/>
	</div>

</div>
</template>


<style scoped>
.slide{
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 100%;
	min-width: 480px;
	background-size: 100%;
	background-position: bottom center;
}
.slider svg{
	width: 100%;
	display: block;
}
.slider-control{
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: -20px;
}
.slider-control .icon{
	width: 40px;
	margin: 5px 40px;
	margin-top: -10px;
	cursor: pointer;
}
.slider-control .icon:hover{
	transform: scale(1.05);
}
@media (max-width: 768px) {
	.slide{
		min-width: auto;
	}
	.slider-control .icon{
		margin: 5px 20px;
		position: relative;
		z-index: 10;
	}
}
</style>