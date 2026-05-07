<script setup>
	import ProgressBar from "@/components/ProgressBar.vue"
	import DWrapper from "@/components/DWrapper.vue"
	import imgPhase1 from "@/assets/roadmap/roadmap-telegram-games.svg"
	import imgPhase2 from "@/assets/roadmap/roadmap-arena.svg"
	import imgPhase3 from "@/assets/roadmap/roadmap-airdrop.svg"
	import imgPhase4 from "@/assets/roadmap/roadmap-utility.svg"
</script>

<template>
	<section class="roadmap container">
		
		<div class="roadmap" >
			<DWrapper type="type31" class="roadmap-step-wrapper">
			<div class="roadmap-step">
				<div class="roadmap-body">
					<p class="title">Phase 1</p>
					<!--ProgressBar max="4" value="4" width="50" height="20" class="roadmap-progress-bar" /-->
					<p class="sub active" >Launch of the <b>$DEGMX</b> airdrop farming system, including spins and the Lucky Chance system</p>
					<p class="sub active" >Launch of an innovative Telegram bot with mini games like RPS that allows users to wager their Airdrop points to win even more points from their opponents</p>
					<p class="sub active" >Deployment of the Degamers NFT smart contract on the Blast Sepolia test network</p>
				</div>
				<div class="roadmap-media">
					<img :src="imgPhase1" size="big" />
				</div>
			</div>
			</DWrapper>

			<DWrapper type="type31" class="roadmap-step-wrapper">
			<div class="roadmap-step roadmap-step2">
				<div class="roadmap-body">
					<p class="title">Phase 2</p>
					<!--ProgressBar max="4" value="1" width="50" height="20" class="roadmap-progress-bar" /-->
					<p class="sub active" >Deployment of the DeGamers NFT smart contract on the Blast Mainnet on February 29</p>
					<p class="sub active" >Mint Activation</p>
					<p class="sub active" >Degamers NFT reveal</p>
					<p class="sub active" >Activation of <b>$DEGMX</b> AirDrop farming boost for the NFT holders by utilizing its mechanics to boost Lucky Chance, NFT upgrades, and grant more daily spins</p>
					<p class="sub" >Arena Beta launch in April</p>
					<p class="sub" >Integration of other projects and protocols inside the Arena</p>
					<p class="sub" >Partnerships with Tier-1 projects, securing the backing and resources needed to fuel our ambitions for the next years</p>
				</div>
				<div class="roadmap-media">
					<img :src="imgPhase2" />
				</div>
			</div>
			</DWrapper>

			<DWrapper type="type31" class="roadmap-step-wrapper">
			<div class="roadmap-step roadmap-step2">
				<div class="roadmap-body">
					<p class="title">Phase 3</p>
					<!--ProgressBar max="4" value="0" width="50" height="20" class="roadmap-progress-bar" /-->
					<p class="sub" ><b>$DEGMX</b> airdrop in Q2 2024</p>
					<p class="sub" >Listings on various CEXs and DEXs</p>
					<p class="sub" >The entire DeGameX platform and its games transition to [REDACTED]</p>
					<p class="sub" >After the transition, <b>$DEGMX</b> will come into play with all its beauty, various utilities, and burn mechanics</p>
					<p class="sub" >Introduction of Fighter's KEYS for all NFTs, offering an experience superior to FriendTech.</p>
					<p class="sub" >KEYS will become freely tradable, providing additional opportunities and bonuses for DeGameX's early supporters.</p>
				</div>
				<div class="roadmap-media">
					<img :src="imgPhase3" />
				</div>
			</div>
			</DWrapper>


		</div>

	</section>
</template>

<style scoped>
p b{ color: var(--main-color); }
.roadmap {
	font-size: 18px;
}
.roadmap-step-wrapper{
	margin-bottom: 30px;
}
.roadmap-step {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
}
.roadmap-progress-bar{
	margin-top: 10px;
	margin-bottom: 30px;
}
.roadmap-step p.sub {
	margin-bottom: 20px;
	position: relative;
	padding-left: 40px;
}
.roadmap-body p.sub:before{
	position: absolute;
	content: '';
	display: block;
	width: 12px;
	height: 100%;
	left: 0;
	border-radius: 3px;
	border: 2px solid white;
}
.roadmap-body p.sub.active:before{
	background: var(--main-color);
	border: 2px solid var(--main-color);
}
.roadmap-body {
	width: 55%;
}
.roadmap-media {
	flex: 0 300px;
	margin-left: 40px;
}
.roadmap-media img {
	width: 100%;
}

@media (max-width: 768px) {

	.roadmap-step {
		flex-direction: column-reverse;
		padding: 20px;
	}
	.roadmap-progress-bar{
		justify-content: center;
	}
	.roadmap-body {
		width: 100%;
		font-size: 20px;
		margin-top: 40px;
		margin-bottom: 90px;
	}
	.roadmap-media {
		flex: auto;
		margin: 0 auto;
		width: 100%ж
	}

}
	
</style>