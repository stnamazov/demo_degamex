<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Loading from '@/components/Loading.vue'
import Icon from '@/components/Icon.vue'
import Button from "@/components/Button.vue"
import NFTLine from "@/components/NFTLine.vue"
import NFTTypes from "@/components/NFTTypes.vue"
import MintControl from "@/components/MintControl.vue"
import DWrapper from "@/components/DWrapper.vue"
import NFTDegamer from "@/components/NFTDegamer.vue"

const checkEligible = ref()
function returnToCheck () {
	checkEligible.value.scrollIntoView({ behavior: "smooth" });
}

</script>

<template>
	<div class="mint flex flex-col items-center">

		<div class="container">
			<img src="@/assets/mint-title.svg" class="mint-main-title" />
			<p class="title mint-main-subtitle" >Mint on <span>Blast</span> is Live!</p>
			<!--Button :text="`Check eligibility`" stroke="" fill="#FAFF00" :width="300" :height="80" class="mint-main-button" @click="returnToCheck()" /-->
		</div>

		<div class="container">

			<div class="mint-form" ref="checkEligible">

				<svg class="mint-form-header-bg" viewBox="0 0 1126 70" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M281.828 25L269 12H285.034L297.862 25H281.828Z" fill="#FAFF00"/>
					<path d="M304.276 25L291.448 12H329.931L342.759 25H304.276Z" fill="#FAFF00"/>
					<path d="M349.172 25L336.345 12H352.379L365.207 25H349.172Z" fill="#FAFF00"/>
					<path d="M371.621 25L358.793 12H374.828L387.655 25H371.621Z" fill="#FAFF00"/>
					<path d="M394.069 25L381.241 12H397.276L410.103 25H394.069Z" fill="#FAFF00"/>
					<path d="M416.517 25L403.69 12H419.724L432.552 25H416.517Z" fill="#FAFF00"/>
					<path d="M438.966 25L426.138 12H442.172L455 25H438.966Z" fill="#FAFF00"/>
					<path d="M278.903 30.6403L279.343 31.0799H279.964H1091.66L1124.37 63.8119V443.492L1097.88 470H31.7287L1.5 439.758V30.2235L31.7065 1.5L249.781 1.50003L278.903 30.6403Z" stroke="white" stroke-width="6"/>
				</svg>

				<div class="mint-form-wrapper" >

					<div class="mint-form-content">

						<NFTDegamer class="mint-form-degamer" />

						<!--p class="title" >How do I mint?</p>
						<p class="text-wave2">You will be able to mint if you have at least 10,000 Degamex airdrop points or won WL in one of our activities!</p>
						<p class="soon-title">Mint starts soon</p>
						<p>If you don't want to miss it, you can start our <a href="https://t.me/degamexbot" target="_blank">Telegram bot</a> to receive a push notification when the mint starts!</p-->
					</div>

					<MintControl class="mint-control" />
					<img src="@/assets/drone.svg" class="mint-drone" />

					<svg class="mint-form-body-bg"  viewBox="0 0 1126 59" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M278.903 -1288.36L279.343 -1287.92H279.964H1091.66L1124.37 -1255.19V1466.61L1097.88 1493.12H31.7285L1.5 1462.88V-1288.78L31.7065 -1317.5L249.781 -1317.5L278.903 -1288.36Z" stroke="white" stroke-width="6"/>
					</svg>

				</div>
				
				<svg class="mint-form-footer-bg" viewBox="0 0 1126 47" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M278.903 -394.36L279.343 -393.92H279.964H1091.66L1124.37 -361.188V18.4923L1097.88 45H31.7287L1.5 14.7578V-394.777L31.7065 -423.5L249.781 -423.5L278.903 -394.36Z" stroke="white" stroke-width="6"/>
				</svg>	

			</div>
		</div>
		<NFTLine class="mint-nft-example" />
		<div class="container">

			<p class="title">Why do I mint?</p>
			<div class="why-mint-boost">
				<p class="subtitle">To boost your <span>$DEGMX</span> points farm!</p>
				<p>Each NFT also grants you 2 extra lootboxes daily with higher crit/block chances versus none-nft players and higher chance of getting RARE / EPIC lootboxes.</p>
				<NFTTypes />
			</div>

			<div class="why-mint-arena">
				<p class="subtitle">To battle in <span>the Arena!</span></p>
				<p>Everyone starts with a BASE and works their way to Epic by battling on the Arena. Fight more, improve the NFT tier and increase the LootBox drop Lucky Chance -  It's that simple!</p>
				<img src="@/assets/mint-arena.svg" class="w-full mt-10" />
			</div>

			<p class="title">FAQ</p>
			<div class="faq">

				<DWrapper type="type31" class="faq-item">
				<div class="faq-item-body">
					<p class="faq-q">What Chain?</p>
					<p>The DeGameX platform is fully built on Blast, so are NFTs.</p>
				</div>
				</DWrapper>

				<DWrapper type="type31" class="faq-item">
				<div class="faq-item-body">
					<p class="faq-q">Wen NFT Reveal?</p>
					<p>March 4th-6th</p>
				</div>
				</DWrapper>

				<DWrapper type="type31" class="faq-item">
				<div class="faq-item-body">
					<p class="faq-q">Where can I see my NFT?</p>
					<p>Either head to the <RouterLink to="/account">My Account</RouterLink> or on secondary Marketplaces.</p>
				</div>
				</DWrapper>

				<DWrapper type="type31" class="faq-item">
				<div class="faq-item-body">
					<p class="faq-q">Where Can I trade My NFT?</p>
					<p>You can trade your NFT on the WEN exchange, Elements Market, or BLUR.</p>
				</div>
				</DWrapper>

				<DWrapper type="type31" class="faq-item">
				<div class="faq-item-body">
					<p class="faq-q">How Can I Increase my NFT's Tier?</p>
					<p>You can increase your NFT's tier by battling in the Arena! Everyone starts with a Base Tier and works their way up to Rare & Epic for more rewards. To achieve Rare, you will need 100 battles, and for Epic, you will need 500.</p>
				</div>
				</DWrapper>


			</div>
			
			<!--div class="why-mint-key">
				<p class="subtitle">To promote your Key everywhere and earn a share from every purchase!</p>
				<p> It's that simple. Just like FriendTech, but better.</p>
				<img src="@/assets/mint-keys.svg" class="mint-keys" />
			</div>
			<Button :text="`Check eligibility`" stroke=""  fill="#FAFF00" :width="300" :height="80" class="mint-main-button" @click="returnToCheck()" /-->

		</div>

	</div>
</template>

<style scoped>
a{
	cursor: pointer;
	position: relative;
	z-index: 1;
}
.mint{
	margin-top: 50px;
	margin-bottom: 50px;
	text-align: center;
	font-size: 24px;
}
.title{
	font-size: 55px;
	margin: 0 auto;
	color: var(--main-color);
	font-weight: 900;
}
.subtitle{
	font-size: 35px;
	color: white;
	font-family: var(--font-orbitron);
	margin-bottom: 20px;
	font-weight: bold;
}
p span{
	display: inline;
	color: var(--main-color);
}
.soon-title{
	color: var(--main-color);
	font-size: 30px;
	font-weight: bold;
}

.mint-price-w{
	margin-bottom: 20px;
}
.mint-price{
	font-family: var(--font-orbitron);
	color: var(--main-color);
	font-weight: 900;
	font-size: 36px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 20px;
}
.mint-price .icon{
	height: 26px;
	margin-left: 5px;
}

.mint-main-title{
	width: 100%;
	max-width: 740px;
	margin: 0 auto;
	margin-bottom: 0px;
}
.mint-main-subtitle{
	margin-top: 30px;
	margin-bottom: 50px;
	color: white;
}
.mint-main-button{
	margin-bottom: 100px;
}

.mint-form{
	position: relative;
	margin-top: 80px;
	margin-bottom: 30px;
}
.mint-form-body-bg{
	position: absolute;
	height: 100%;
	width: 100%;
	top: 0;
}
.mint-form-wrapper{
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	position: relative;
	margin-top: -10px;
	margin-bottom: -10px;
}
.mint-form-degamer{
	margin-bottom: -35px;
	margin-left: -70px;
	margin-top: -45px;
	transform-origin: 0% 100%;
	transform: scale(1.2);
}
.mint-drone{
	position: absolute;
	top: -150px;
	right: -120px;
	z-index: 1;
	pointer-events: none;
	animation: drone 3s ease-in-out infinite alternate;
}
.mint-form-content{
	width: 45%;
	margin-left: 80px;
	margin-right: 50px;
	text-align: left;
}
.mint-form-content p{
	margin-bottom: 20px;
}
.wave1{ color: rgb(141, 227, 20); }
.wave2{ color: var(--main-color); }

.text-wave1, .text-wave2{
	position: relative;
	padding-left: 30px;
}
.text-wave1:before, .text-wave2:before{
	position: absolute;
	content: '';
	display: block;
	width: 10px;
	height: 100%;
	left: 0;
	border-radius: 3px;
	background: var(--main-color);
}
.text-wave1:before{
	background:  rgb(141, 227, 20);
}
.mint-control{
	display: flex;
	align-items: stretch;
	position: relative;
	z-index: 1;
	width: 40%;
	height: auto;
	margin-right: 40px;
	margin-top: -150px;
}

.mint-nft-example{
	margin-bottom: 30px;
}

.why-mint-boost{
	max-width: 75%;
	margin: 0 auto;
	margin-top: 40px;
}

.why-mint-arena{
	max-width: 75%;
	margin: 0 auto;
	margin-bottom: 60px;
}
.mint-arena{
	width: 100%;
	max-width: 800px;
	margin-top: 40px;
}

.why-mint-key{
	max-width: 70%;
	margin: 0 auto;
	margin-bottom: 60px;
}

.mint-keys{
	width: 100%;
	max-width: 800px;
	margin-top: 40px;
}

.faq{
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 30px;
}
.faq-item{
	width: 100%;
	max-width: 80%;
	margin-bottom: 20px;
}
.faq-item-body{
	padding: 0 50px;
}
.faq-q{
	color: var(--main-color);
	margin-bottom: 20px;
}

.faq-q{
	position: relative;
	
}
.faq p{
	margin-bottom: 10px;
}
.faq p b{
	color: var(--main-color);
}


@keyframes drone {
	0%{
		margin-top: 0;
	}
	100%{
		margin-top: -100px;
	}
}

@media (max-width: 980px) {
	.mint-form-content{
		margin: 0 30px;
		width: 10%;
	}
	.mint-control{
		width: 50%;
	}
	.mint-form-degamer{
		margin-bottom: -20px;
		margin-left: -30px;
		transform: scale(0.8);
	}
}


@media (max-width: 768px) {
	.mint .title{
		font-size: 32px;
	}
	.mint .subtitle{
		font-size: 32px;
	}
	.mint-form{
		margin-top: -240px;
	}
	.mint-form-header-bg, .mint-form-body-bg, .mint-form-footer-bg{
		display: none;
	}
	.mint-form-wrapper{
		flex-direction: column;
	}
	.mint-form-content{
		margin: 0;
		margin-bottom: 30px;
		width: 100%;
	}
	.mint-form-degamer{
		margin: 0 auto;
		margin-bottom: -50px;
		transform: scale(0.6);
	}
	.mint-drone{
		top: 300px;
		margin-right: -30px;
	}
	.mint-control{
		margin: 0;
		width: 100%;
	}
	.nft-type{
		font-size: 18px;
		width: 25%;
	}
	.nft-type-lucky-chance{
		font-size: 32px;
	}

	.why-mint-boost, .why-mint-arena, .why-mint-key{
		width: 100%;
		max-width: 100%;
	}

	.faq-item{
		width: 100%;
		max-width: 100%;
	}

}
	
</style>