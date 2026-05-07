<script setup>
	import { useStore } from 'vuex'
	import Loading from '@/components/Loading.vue'
	import Button from "@/components/Button.vue"

	const store = useStore()
	const isConnecting = computed(() => store.getters.isConnecting)
	const address = computed(() => store.getters.address)
	const authToken = computed(() => store.getters.authToken)
	
</script>

<template>
	<div class="connect">
		<Loading v-if="isConnecting" />
		<span v-else-if="address && authToken" class="uppercase">Connected (demo)</span>
	</div>
</template>

<style scoped>

	.connect{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	@media (max-width: 768px) {

	}


</style>