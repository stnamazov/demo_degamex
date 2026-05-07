<script setup>
	import { defineProps, computed } from 'vue'
	const props = defineProps({
		stroke: {
			type: String,
			default: 'var(--main-color)'
		},
		width: {
			type: Number,
			default: 60
		},
		height: {
			type: Number,
			default: 60
		},
		imageUrl: {
			type: String,
			default: false
		},
		id: {
			type: String,
			default: ''
		}
	})

	const fillImage = computed(() => {
		return props.imageUrl ? `url(#playerProfilePattern${props.id})` : '#111111';
	})

</script>

<template>
<div>
	<svg :height="props.height" :viewBox="`0 0 ${props.width+2} ${props.height+3}`" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path :d="`M${props.width} 10L${props.width-10} 2H10L2 10V${props.height-7}L10 ${props.height}H${props.width-10}L${props.width} ${props.height-7}V10Z`" :fill="fillImage" :stroke="props.stroke" stroke-width="2"/>
		<defs>
			<pattern :id="`playerProfilePattern${props.id}`" patternContentUnits="objectBoundingBox" width="1" height="1">
				<use :xlink:href="`#playerProfileImage${props.id}`" transform="translate(0 -0.206751) scale(0.0021097)"/>
			</pattern>
			<image :id="`playerProfileImage${props.id}`" width="474" height="670" :xlink:href="props.imageUrl"/>
		</defs>
	</svg>

</div>
</template>


<style scoped>
div{
	display: inline-block;
}
</style>