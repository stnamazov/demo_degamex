<script setup>
	
</script>

<template>
	
	<section class="about container">
		
		<div class="about-body">
			<div class="about-media">
				<img src="@/assets/about.svg" />
			</div>
			<div class="about-content">
				<p class="title">Powered by</p>
				<img class="blast-logo" src="@/assets/blast.png" />
				<p>Use bots in top social networks and browser to interact with the platform on and get benefits of the Blast network, such as <span>NATIVE YIELD</span> and <span>GAS FEE REVENUE</span></p>
			</div>
		</div>

	</section>

</template>

<style scoped>
.about{
	text-align: center;
	max-width: 980px;
	margin: 0 auto;
	margin-top: 100px;
	margin-bottom: 50px;
}
.title{
	font-size: 32px;
	font-weight: bold;
	text-transform: uppercase;
}
.blast-logo{
	width: 100%;
	max-width: 360px;
	margin-left: -12px;
	margin-bottom: 30px;
	margin-top: -15px;
}
.about-body{
	display: flex;
	align-items: center;
	margin-top: 30px;
}
.about-media{
	width: 60%;
}
.about-media img{
	width: 120%;
	margin-left: -100px;
}
.about-content{
	width: 50%;
	margin-left: 50px;
	text-align: left;
}
.about-content p{
	font-size: 22px;
	margin-bottom: 20px;
}
.about-content p span{
	color: #FAFF00;
}

@media (max-width: 768px) {
	.about-body{
		flex-direction: column-reverse;
	}
	.about-media, .about-content{
		width: 100%;
	}
	.about-media{
		display: flex;
		justify-content: center;
	}
	.about-media img{
		width: 130%;
		margin-left: 0px;
		margin-top: 20px;
	}
	.about-content {
		margin: 0;
		margin-top: 20px;
		text-align: center;
	}
	.button{
		margin: 0 auto;
	}
}
	
</style>