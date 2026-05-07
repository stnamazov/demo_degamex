<script setup>
	import { computed, watch, ref } from 'vue'
	import { useStore } from 'vuex'
	import Icon from "@/components/Icon.vue"
	import Loading from "@/components/Loading.vue"
	import { getDemoLootboxesTotalCount } from '@/demo/demo.js'

	const store = useStore()

	const isConnecting = computed(() => store.getters.isConnecting)
	const authToken = computed(() => store.getters.authToken)
	const address = computed(() => store.getters.address)
	const lootboxesCount = computed(() => store.getters.lootboxesCount)

	const isLoading = ref(true)

	watch(authToken, async (newAuthToken) => {

		// demo-only: no backend request
		await store.dispatch('setLootboxesCount', getDemoLootboxesTotalCount())
		isLoading.value = false

	}, { immediate: true })

	
</script>

<template>
	<div v-if="isConnecting || (authToken && isLoading)" >
		<Loading class="w-[40px]" />
	</div>
	<div v-else class="flex items-center gap-6" >

		<RouterLink to="/account" class="relative hover:scale-105">
			<Icon type="lootbox" class="w-8" />
			<div v-if="lootboxesCount > 0" class="bg-red-500 rounded-md font-black text-white text-[10px] p-[3px] min-w-5 flex items-center justify-center absolute bottom-[-10px] left-[-10px]" >{{lootboxesCount}}</div>
		</RouterLink>

		<div class="flex flex-col items-end text-right" >
			<span v-if="address" class="text-sm flex items-center" >
				{{ address.substr(0,4) + "..." + address.substr(-4) }}
			</span>
			<RouterLink to="/account" class="hover:scale-105 text-md uppercase" >My account</RouterLink>
		</div>
	</div>

</template>