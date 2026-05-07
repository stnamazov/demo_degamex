<script setup>
	import { computed } from 'vue'
	import { useStore } from 'vuex'

	const store = useStore()
	const address = computed(() => store.getters.address)
	
</script>

<template>
	<div v-if="address" class="connected" >
		<span>{{ address.substr(0,4) + "..." + address.substr(-4) }}</span>
	</div>
</template>

<style scoped>
	
	
	button{
		display: block;
		background-size: contain;
		border: none;
		color: #FFFFFF;
		background: none;
		text-transform: uppercase;
		font-size: 16px;
		font-weight: bold;
		padding: 5px 10px;
		cursor: pointer;
	}

	.connected{
		display: flex;
		align-items: center;
	}
	.connected button{
		border: none;
		background: none;
		padding: 5px;
		padding-left: 1px;
		width: 30px;
		height: 30px;
		margin-left: 15px;
	}
	.connected img{
		width: 100%;
	}

	.connected a{
		color: #FFFFFF;
		text-decoration: none;
		padding: 5px 10px;
		text-transform: uppercase;
		font-size: 16px;
	}
	.connected a:hover, button:hover{
		background: url('@/assets/active-bottom-left.svg') no-repeat bottom left, url('@/assets/active-bottom-right.svg') no-repeat bottom right, url('@/assets/active-top-left.svg') no-repeat top left, url('@/assets/active-top-right.svg') no-repeat top right;
	}

	a.my-account{
		color: var(--main-color);
		margin-right: 10px;
	}

	@media (max-width: 768px) {
		.connected a{
			font-size: 14px;
		}
	}


</style>