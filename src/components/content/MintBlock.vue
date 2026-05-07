<script setup>
	
</script>

<template>
	
	<div class="container">
		<section class="mint">
			
			<div class="mint-body">
				<div class="mint-content">
					<p class="title">Mint DeGamers</p>
					<p>DEGAMERS owners have access to various benefits, such as reimbursement of gas costs, no commissions when winning, increased payments to administrators and a referral system.</p>
					<router-link to="/nft" class="button button-black">
						<span>MINT NOW</span>
						<div class="button-bg"></div>
					</router-link> 
				</div>
			</div>

			<img class="mint-media" src="@/assets/mint-media.svg" />

		</section>
	</div>

</template>

<style scoped>

.mint{
	background: url('@/assets/mint-bg-top.svg') no-repeat top center, url('@/assets/mint-bg-bottom.svg') no-repeat bottom center;
	background-size: contain, contain;
	color: black;
	position: relative;
	z-index: 100;
	margin-top: 60px;
	margin-bottom: 100px;
	padding-top: 75px;
	padding-bottom: 50px;
	min-height: 320px;
}
.mint-body{
	display: flex;
	align-items: center;
	justify-content: center;
	background: #FAFF00;
	padding-left: 400px;
	padding-right: 100px;
}

.mint-media{
	width: 100%;
	max-width: 320px;
	position: absolute;
	bottom: -1px;
	left: 50px;
}

.mint .title{
	color: black;
	font-size: 32px;
	font-weight: bold;
	text-transform: uppercase;
	margin-bottom: 10px;
}

.mint .button-black{
	margin-top: 15px;
	margin-bottom: 20px;
	padding: 5px 10px;
	text-transform: uppercase;
	position: relative;
	/*pointer-events: none;*/
}

.soon:after{
	content: "SOON";
	position: absolute;
	color: #FAFF00;
	font-size: 16px;
	bottom: 0;
	right: 0;
	transform: rotate(-10deg);
	border: 2px solid #FAFF00;
	background: black;
	border-radius: 2px;
	padding: 1px 3px;
}

@media (max-width: 768px) {
	.mint{
		padding-top: 40px;
	}
	.mint-body{
		padding-left: 30px;
		padding-right: 30px;
		padding-bottom: 300px;
		text-align: center;
	}
	.mint .button-black{
		margin: 0 auto;
		margin-bottom: 20px;
		margin-top: 20px;
	}
	.mint-media{
		left: auto;
		right: 10px;
	}
}
	
</style>