<script setup>
	
</script>

<template>
	
	<section class="tokenomics container">
		
		
		<div class="tokenomics__body">

			<img class="tokenomics__title" src="@/assets/images/title-tokenomics.svg" />

			<div class="tokenomics__block">
				<div class="tokenomics__block-media">
					<img src="@/assets/images/test-coin.png" />
				</div>
				<div class="tokenomics__block-body">
					<h3>DEG-T</h3>
					<p>Token for test games. You can get 100 DEG-T no more than once every 24 hours through the Faucet section in the bot menu. For using DEG-T in games, a minimum rank is awarded (for the maximum rank, use DEG-A) in the first 300 games; after 300 games, no rank is awarded for using DEG-T!</p>
					<ul>
						<li>No referral commissions</li>
						<li>No administrator commissions</li>
						<li>Rank accrual only for the first 300 games</li>
					</ul>
				</div>
			</div>

			<div class="tokenomics__block">
				<div class="tokenomics__block-media">
					<img src="@/assets/images/a-coin.png" />
				</div>
				<div class="tokenomics__block-body">
					<h3>DEG-A</h3>
					<p>The main token for the airdrop phase. You can deposit and withdraw USDT on the Ethereum, BSC or Avalanche networks. For using DEG-A, the maximum rank is awarded. When withdrawing, compensation for gas is withheld, which depends on the withdrawal network</p>
					<ul>
						<li>Referral commission 1% of referral winnings</li>
						<li>Commission for administrators 1% of the volume of games in the cha</li>
						<li>3% commission goes to the DEG liquidity pool</li>
					</ul>
				</div>
			</div>

			<div class="tokenomics__block">
				<div class="tokenomics__block-media">
					<img src="@/assets/images/deg-coin.png" />
				</div>
				<div class="tokenomics__block-body">
					<h3>DEG</h3>
					<p>The main token of the DeGameX platform. Freely convertible via DEX.</p>
					<ul>
						<li>Supply - TBA</li>
						<li>Referral commission - TBA</li>
						<li>Administrator fees - TBA</li>
						<li>Platform commission - TBA</li>
					</ul>
				</div>
			</div>


		</div>

	</section>

</template>

<style scoped>

.tokenomics{
	margin-top: 150px;
}
.tokenomics__title{
	margin: 50px auto;
	display: block;
}
.tokenomics__body h3{
	font-size: 24px;
	margin-bottom: 10px;
	margin-top: 50px;
}
.tokenomics__body p{
	margin-bottom: 10px;
}
.tokenomics__block{
	display: flex;
	align-items: center;
	margin-bottom: 60px;
}
.tokenomics__block-body{
	max-width: 500px;
}
.tokenomics__block-media{
	max-width: 350px;
	margin-right: auto;
}
.tokenomics__block-media img{
	width: 100%;
}

@media (max-width: 768px) {
	.tokenomics{
		margin-top: 50px;
	}
	.tokenomics__block{
		flex-direction: column;
	}
	.tokenomics__block-media{
		width: 100%;
		margin-right: 0;
	}
	.tokenomics__title{
		width: 100%;
	}
}
	
</style>