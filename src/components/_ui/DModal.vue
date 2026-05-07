<script setup>
	
	import { defineEmits } from "vue"
    import Icon from '@/components/Icon.vue'
	const emit = defineEmits(['modal-close'])

</script>

<template>

	<div @click="emit('modal-close')" class="fixed z-[1000] w-screen h-screen bg-black/80 flex items-center justify-center p-10" >
		<div class="relative w-full max-w-[480px]">
            <Icon @click="emit('modal-close')"  type="close" class="absolute top-5 right-5 w-5 cursor-pointer hover:scale-110" />
			<div class="p-10 bg-black/80 border border-white/10 rounded-md">
				<slot></slot>
			</div>
		</div>
	</div>

</template>