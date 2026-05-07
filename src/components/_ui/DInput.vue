<script setup>
	import { defineProps, defineEmits, reactive } from 'vue'
	const props = defineProps({
		fill: {
			type: String,
			default: 'none'
		},
		stroke: {
			type: String,
			default: '#FFFFFF'
		},
		width: {
			type: Number,
			default: 300
		},
		height: {
			type: Number,
			default: 60
		},
		text: String
	})

	const emit = defineEmits(['input-change'])

	const state = reactive({
		inputValue: null
	})

</script>

<template>
	<div>
		<input type="text" :style="`color:${stroke};`" :placeholder="props.text" v-model="state.inputValue" @change="$emit('input-change', state.inputValue)"/>
		<svg :height="props.height" :viewBox="`0 0 ${props.width+2} ${props.height+3}`" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path :d="`M${props.width} 10L${props.width-10} 2H10L2 10V${props.height-7}L10 ${props.height}H${props.width-10}L${props.width} ${props.height-7}V10Z`" :fill="props.fill" :stroke="props.stroke" stroke-width="3"/>
		</svg>
	</div>
</template>


<style scoped>
div{
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	transition: all 0.2s;
}
div input{
	border: none;
	background: none;
	position: absolute;
	font-size: 16px;
	position: absolute;
	padding: 10px 20px;
	outline: none;
	width: 100%;
}
</style>