<script setup>
import VideoPreview from "@/components/VideoPreview.vue"
import Button from "@/components/Button.vue"
import DWrapper from "@/components/DWrapper.vue"
import Icon from "@/components/Icon.vue"
import NFTTypes from "@/components/NFTTypes.vue"
import Slider from "@/components/Slider.vue"

const playVideo = () => {

}
</script>

<template>
	<div class="home container">


		<section class="mb-[-20px]">

			<img alt="DeGameX" class="w-full my-14" src="@/assets/logo.svg" />
			<p class="uppercase font-orbitron text-center text-2xl w-full md:max-w-[1024px] mx-auto mb-10">The first NFT collection to combine <span class="text-main">SocialFi</span> & <span class="text-main">GameFi</span> on BLAST! Play, compete, upgrade your NFTs tier and earn rewards!</p>
			
			<div class="relative max-w-[1280px] mx-auto flex flex-col-reverse md:flex-row mb-20 md:mb-0">
				<img class="w-full hidden md:block relative z-10" src="@/assets/home/main-media-degamer.svg" />
				<div class="flex justify-end md:absolute top-0 md:top-10 md:right-10 md:w-[70%]">
					<VideoPreview class="relative animation-absolute-fly" />
				</div>
			</div>

		</section>

		<section>
			<DWrapper type="type31" class="relative z-10 text-center md:text-left">
				<div class="flex flex-col-reverse md:flex-row items-center justify-center p-10">
					<div class="md:w-1/2">
						<p class="uppercase font-orbitron md:text-2xl">Fight in the arena and get <span class="text-main">free lootboxes</span> daily! Degamers NFT holders get more lootboxes and extra bonuses!</p>
						<RouterLink to="/arena" >
							<Button text="Play ARENA" :height="80" :width="220" stroke="#FAFF00" class="mt-6" />
						</RouterLink>
					</div>
					<img class="relative z-10 md:w-1/3 max-h-[200px] md:max-h-[400px] mb-10 md:mb-0" src="@/assets/home/main-media-lootbox.svg" />
				</div>
			</DWrapper>
		</section>

		<section class="mt-20 text-center">
			<p class="uppercase font-orbitron text-4xl font-black text-center max-w-[640px] mx-auto"><span class="text-main">DEGAMERS</span> - NFTs THAT TRULY MAKE SENSE</p>
			<img class="" src="@/assets/home/main-media-nfts.svg" />
			<DWrapper type="type31" class="relative">
				<div class="max-w-[1024px] p-10 mx-auto">
					<p>DEGAMER IS AN NFT AND YOUR ACCESS PASS TO <span class="text-main">THE ARENA!</span> EACH DEGAMER IS A FIGHTER AND ALSO YOUR BEST TOOL TO MAKE IT BIG ON BLAST! PLAY TO UPGRADE YOUR NFT TIER AND GET BIGGER REWARDS!</p>
					<p>EACH NFT ALSO GRANTS YOU <span class="text-main">2 EXTRA LOOTBOXES DAILY!</span></p>
					<NFTTypes class="nft-types" />
					<RouterLink to="/mint" >
						<Button text="MINT NOW" :height="80" :width="220" stroke="#FAFF00" />
					</RouterLink>
				</div>
			</DWrapper>
		</section>


	</div>
</template>