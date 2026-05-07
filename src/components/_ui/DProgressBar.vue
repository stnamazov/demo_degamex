<script setup>
	import { defineProps } from 'vue'
	const props = defineProps({
        max: {
            type: Number,
			default: 100
        },
        value: {
            type: Number,
			default: 0
        },
        label: {
            type: String,
			default: ''
        },
    })

</script>

<template>

	<div class="text-center">
        <div class="bg-black rounded-md overflow-hidden flex my-2 text-sm">
            <div class="bg-main text-center min-h-[10px]" :style="`width: ${100 / props.max * props.value}%;`">
                <span v-if="100 / props.max * props.value >= 50" class="text-black" >{{props.label}}</span> 
            </div>
            <div class="text-center" :style="`width: ${100 - (100 / props.max * props.value)}%;`">
                <span v-if="100 / props.max * props.value < 50" >{{props.label}}</span> 
            </div>
        </div>
        <span>{{`${props.value} / ${props.max}`}}</span>
	</div>

</template>

<style scoped>

</style>
