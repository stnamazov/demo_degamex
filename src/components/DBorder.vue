<script setup>

</script>

<template>

	<div class="d-border">
        <div class="d-border-body">
        	<slot></slot>
        </div>
    </div>

</template>

<style scoped>
    .d-border{
		background: url('@/assets/modal-bg-top.svg') no-repeat top center, url('@/assets/modal-bg-bottom.svg') no-repeat bottom center;
		background-size: 100%, 100%;
		width: 100%;
		padding-top: 50px;
		padding-bottom: 50px;
	}
	.d-border-body{
		background: url('@/assets/modal-bg-center.svg') repeat-y bottom left;
		background-size: 100%;
		padding: 50px;
	}
	@media (max-width: 1200px) {
		.d-border{
			padding-top: 40px;
			padding-bottom: 40px;
		}
	}
	@media (max-width: 768px) {
		.d-border{
			padding-top: 20px;
			padding-bottom: 20px;
		}
		.d-border-body{
			padding: 30px;
		}
	}
</style>
