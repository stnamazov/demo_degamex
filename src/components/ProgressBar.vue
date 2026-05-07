<script setup>
	import { defineProps } from 'vue'
	const props = defineProps({
        max: Number,
        value: Number,
		width: {
			type: Number,
			default: 20
		},
		height: {
			type: Number,
			default: 25
		}
    })
</script>

<template>

	<div class="bar">
		<span v-for="index in parseInt(props.max)" v-bind:key="index" :class="{active: index <= props.value}" :style="`width: ${width}px; height: ${height}px;`"></span>
	</div>

</template>

<style scoped>
.bar{
	display: flex;
	align-items: center;
}
.bar span{
	display: block;
	/*width: 20px; height: 25px;*/
	border: 1px solid #FFFFFF;
	margin-right: 5px;
	border-radius: 2px;
}
.bar span.active{
	border: 1px solid #FAFF00;
	background: #FAFF00;
}
</style>
