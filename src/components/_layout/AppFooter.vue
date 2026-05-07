<script setup>
	import AppSocialLinks from '@/components/_layout/AppSocialLinks.vue'
	const currentYear = new Date().getFullYear()
</script>

<template>

	<footer>
		
		<p>© {{currentYear}} degamex.demo</p>
		<AppSocialLinks />
		
	</footer>

</template>

<style scoped>
	footer{
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 30px;
		padding-bottom: 130px;
		position: relative;

	}
	p{
		margin-right: 30px;
	}
	a{
		margin-left: 20px;
		font-size: 14px;
	}

	@media (max-width: 768px) {
		footer{
			flex-direction: column;
			text-align: center;
			padding-bottom: 160px;
		}
		footer p{
			margin: 0;
			margin-top: 20px;
			order: 4;
		}
		footer a{
			margin-left: 0px;
			margin-top: 10px;
		}
	}
</style>
