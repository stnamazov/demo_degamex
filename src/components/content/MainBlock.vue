<script setup>
	
</script>

<template>
	
	<section class="main" id="Main">

		<div class="container">
			<div class="main-content">
				<p class="title">Powered by</p>
				<img class="blast-logo" src="@/assets/blast.png" />
				<p>Use bots in top social networks and browser to interact with the platform on and get benefits of the Blast network, such as <span>NATIVE YIELD</span> and <span>GAS FEE REVENUE</span></p>
				<a href="https://t.me/degamexbot" target="_blank" class="button button-green">
					<span>Start Your Game</span>
					<div class="button-bg"></div>
				</a> 
			</div>
			<div class="mai-media">
				<img src="@/assets/main.svg" />
			</div>
		</div>
		<img class="main-media-x" src="@/assets/x.svg" />

	</section>

</template>

<style scoped>

	.main{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		margin-top: 60px;
	}
	.main .container{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.main-content{
		width: 50%;
		margin-right: auto;
		animation: show 1s;
		position: relative;
		z-index: 100;
		margin-right: 50px;
	}
	.main-content img{
		width: 100%;
	}
	.main-content p{
		margin-bottom: 20px;
		font-size: 20px;
	}
	.main-content p.title{
		font-size: 28px;
		font-weight: bold;
		font-style: italic;
		text-transform: uppercase;
	}
	.main-content .main-platform-link{
		margin-right: 20px;
		width: 200px;
		height: 50px;
		margin-bottom: 20px;
	}
	.main-content .blast-logo{
		width: 100%;
		max-width: 360px;
		margin-left: -12px;
		margin-bottom: 30px;
		margin-top: -15px;
	}
	.main-content p span{
		color: #FAFF00;
	}
	.main-content .button span:hover{
		background: none;
	}

	.main-media{
		position: relative;
		animation: show 1s;
		z-index: 10;
		width: 50%;
	}
	.main-media img{
		width: 100%;
		margin-left: 30px;
	}

	.main-media-x{
		position: absolute;
		top: -203px;
		left: -45%;
		width: 900px;
		opacity: 0.03;
		animation: rotate 20s linear infinite;
	}

	@media (max-width: 768px) {
		.main{
			height: auto;
		}
		.main .container{
			flex-direction: column-reverse;
			align-items: flex-start;
			justify-content: flex-start;
		}
		.main-content{
			width: 100%;
			margin-left: 0px;
			margin-bottom: 50px;
			margin-top: 50px;
			position: relative;
			z-index: 120;
			text-align: center;
		}
		.main-content .button{
			width: 100%;
		}
		.main-media{
			width: 100%;
		}
		.main-media img{
			margin-left: 0;
		}
	}
	
</style>