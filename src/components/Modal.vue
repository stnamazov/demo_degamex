<script setup>
	
	import { defineEmits } from "vue"

	const emit = defineEmits(['modal-close'])

</script>

<template>

	<div class="modal" >
		<div class="modal-body">
			<button @click="emit('modal-close')" class="modal-close"></button>
			<div class="modal-body-content">
				<slot></slot>
			</div>
		</div>
	</div>

</template>

<style>
	.modal{
		height: 100vh;
		width: 100%;
		background: #000000e0;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.modal-body{
		position: relative;
		width: 900px;
		background: url('@/assets/modal-bg-top.svg') no-repeat top center, url('@/assets/modal-bg-bottom.svg') no-repeat bottom center;
		background-size: 100%, 100%;
		padding-top: 40px;
		padding-bottom: 35px;
	}
	.modal-body-content{
		width: 100%;
		background: url('@/assets/modal-bg-center.svg') repeat-y bottom left;
		background-size: 100%;
		padding: 20px 50px;
		text-align: center;
	}

	.modal-close{
		width: 30px;
		height: 30px;
		background: url('@/assets/icon_close.svg') center center;
		background-size: 100%;
		border: none;
		position: absolute;
		top: -30px;
		right: -30px;
	}

	.modal .title{
		margin-bottom: 20px;
	}
	.modal .button{
		margin: 0 auto;
	}
	.modal p{
		margin-bottom: 10px;
	}
	.modal ul{
		margin-bottom: 10px;
		padding-left: 15px;
	}
	@media (max-width: 768px) {
		.modal-body{
			width: 90%;
			display: flex;
			align-items: center;
			text-align: center;
			padding-top: 20px;
			padding-bottom: 15px;
		}
		.modal-body-content{
			padding: 30px;
			padding-top: 80px;
		}
		.modal .button{
			margin: 0 auto;
			margin-top: 20px;
		}
		.modal-close{
			top: 30px;
			right: 30px;
		}
		.modal .title{
			font-size: 24px;
		}
	}
</style>
