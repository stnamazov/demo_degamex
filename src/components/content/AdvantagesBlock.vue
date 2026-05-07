<script setup>
	
</script>

<template>
	<div class="container">
		<section class="advantages">
			
			<div class="advantages__block advantages__block-players">
				<div class="advantages__block-body">
					<div class="advantages__block-media">
						<img src="@/assets/for-players.svg" />
					</div>
					<div class="advantages__block-content">
						<p class="title">For players</p>
						<p>Play, win, and grow in ranks. Join tournaments to earn rewards. Grow your betting volume to collect AirDrop points. Invite friends and get up to 2% of what they win.</p>
					</div>
				</div>
			</div>

			<div class="advantages__block advantages__block-admins">
				<div class="advantages__block-body">
					<div class="advantages__block-media">
						<img src="@/assets/for-admins.svg" />
					</div>
					<div class="advantages__block-content">
						<p class="title">For admins</p>
						<p>Add the bot to your chat, invite users to use it and play more games, and you could earn up to 3% of the total game volume in your chat. As the game volume in your chat grows, admins might even get the chance to introduce their own tokens for deposits and withdrawals.</p>
					</div>
				</div>
			</div>

			<div class="advantages__block advantages__block-hodlers">
				<div class="advantages__block-body">
					<div class="advantages__block-media">
						<img src="@/assets/for-hodlers.svg" />
					</div>
					<div class="advantages__block-content">
						<p class="title">For hodlers</p>
						<p>Hold onto your $DEG tokens and watch your earnings grow as you receive a cut of the 80% fees collected from all the chats and daily game action. The more you hold, the more you can farm.</p>
					</div>
				</div>
			</div>

		</section>
	</div>
</template>

<style scoped>

.advantages{
	display: flex;
	align-items: center;
	opacity: 1;
	animation: show 1s;
	margin-left: -20px;
	margin-top: 100px;
}

.advantages__block{
	display: flex;
	background: #000000;
	position: relative;
	z-index: 100;
	transition: all 0.2s;
	flex: 1 33%;
	margin-left: 20px;
	background: url('@/assets/block-a-top.svg') no-repeat top center, url('@/assets/block-a-bottom.svg') no-repeat bottom center;
	background-size: 100%, 100%;
}

.advantages__block.advantages__block-admins{
	background: url('@/assets/block-a-top3.svg') no-repeat top center, url('@/assets/block-a-bottom.svg') no-repeat bottom center;
	background-size: 100%, 100%;
}

.advantages__block.advantages__block-hodlers{
	background: url('@/assets/block-a-top2.svg') no-repeat top center, url('@/assets/block-a-bottom.svg') no-repeat bottom center;
	background-size: 100%, 100%;
	margin-top: 10px
}

.advantages__block-body{
	display: flex;
	flex-direction: column-reverse;
	margin-top: 35px;
	margin-bottom: 25px;
	background: url('@/assets/block-a-center.svg') repeat-y bottom left;
	background-size: 100%;
}

.advantages__block-admins .advantages__block-body{
	flex-direction: column;
}

.advantages__block-content{
	min-height: 250px;
	padding: 30px;
}
.advantages__block-content .title{
	font-size: 22px;
	text-transform: uppercase;
	font-weight: bold;
	font-style: italic;
	margin-bottom: 20px;
}

.advantages__block-media{
	width: 100%;
	padding: 20px;
	margin-top: -40px;
	margin-bottom: -100px;
}

.advantages__block-admins .advantages__block-media{
	margin-top: -80px;
	margin-bottom: -30px;
	padding: 30px;
}

.advantages__block-media img{
	display: block;
	width: 100%;
}

@media (max-width: 768px) {
	.advantages{
		flex-direction: column;
		margin-left: 0;
	}
	.advantages__block{
		margin-left: 0;
		margin-bottom: 60px;
	}
	.advantages__block-body{
		margin-top: 30px;
		margin-bottom: 30px;
	}
	.advantages__block-admins .advantages__block-body{
		flex-direction: column-reverse;
	}
	.advantages__block-admins .advantages__block-media{
		margin-top: -40px;
		margin-bottom: -100px;
	}
}
	
</style>