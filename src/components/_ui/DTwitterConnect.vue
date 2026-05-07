<script setup>
	
	import axios from 'axios'
	import { useStore } from 'vuex'
	import { computed } from 'vue'
	import DButton from '@/components/_ui/DButton.vue'

	const store = useStore()
	const address = computed(() => store.getters.address)

	const challenge = '5wTyFgpv2cKOXjQzT0c6MTpj7hHwWp3ZXc3mhY'
	const client_id = 'RW5wT3ZXc3kxUmhTNXVMYjQzT0c6MTpjaQ'
	const redirect_uri = `${import.meta.env.VITE_API_URL}/v1/twitter/validate`
	const scope = 'tweet.read%20follows.read%20users.read%20follows.write'
	const code_challenge_method = 'plain'

</script>

<template>

	<a :href="`https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=${address}&code_challenge=${challenge}&code_challenge_method=${code_challenge_method}`" >
		<DButton text="Connect Twitter" stroke="#FAFF00" :width="200" :height="36" class="text-sm" />
	</a>

</template>