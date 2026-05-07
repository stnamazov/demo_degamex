<script setup>
	
</script>

<template>
	
	<section class="game">
		
		<div class="game__content">

			<p class="title">HOW TO PLAY?</p>

			<div class="tabs">
				<p class="active">Telegram</p>
				<p>Discord</p>
				<p>Browser</p>
			</div>

			<div class="game__step game__step1">
				<div class="game__step-body">
					<p class="game__step-title">Find a Telegram chat with <a href="https://t.me/degamexbot" target="_blank">@degamexbot</a></p>
					<p>Choose a chat from the list in the <RouterLink to="/chatboard" >Chatboard</RouterLink> or visit us at <a href="https://t.me/degamex" target="_blank">@degamex</a></p>
				</div>
			</div>

			<div class="game__step game__step2">
				<div class="game__step-body">
					<p class="game__step-title">Type /rps</p>
					<img src="@/assets/game_step_1.png" />
				</div>
			</div>

			<div class="game__step game__step3">
				<div class="game__step-body">
					<p class="game__step-title">Choose<br><span>👊</span> rock, <span>🖐</span> paper or <span>✌️</span> scissors</p>
				</div>
			</div>

			<div class="game__step game__step4">
				<div class="game__step-body">
					<p class="game__step-title">Wait for your opponent to choose</p>
					<img src="@/assets/game_step_2.png" />
				</div>
			</div>

			<div class="game__step game__step5">
				<div class="game__step-body">
					<p class="game__step-title">Wait for the results</p>
					<img src="@/assets/game_step_3.png" />
				</div>
			</div>

			<div class="game__btns">
				<a href="https://t.me/degamexbot" target="_blank" class="button button-green play-now-button">
					<span>PLAY NOW</span>
					<div class="button-bg"></div>
				</a>

				<router-link to="/leaderboard" class="leaderboard-link">
					<span>Leaderboard</span>
					<div class="button-bg"></div>
				</router-link> 
			</div>

		</div>

	</section>

</template>

<style scoped>
.game{
	display: flex;
	align-items: center;
	position: relative;
	min-height: 500px;
	min-height: 100vh;
	background-repeat: no-repeat;
	background-size: 100%;
	margin: 0 auto;
	margin-top: 100px;
}
.game_left, .game_right{
	position: absolute;
	width: 350px;
	top: 0;
}
.game_left{
	left: -50px;
	top: 45%;
}
.game_right{
	right: -50px;
}

.game .tabs{
	display: flex;
	align-items: center;
	justify-content: center;
}
.game .tabs p{
	margin: 0 5px;
	padding: 5px 10px;
	text-transform: uppercase;
	position: relative;
}
.game .tabs p:after{
	content: "SOON";
	position: absolute;
	color: #FAFF00;
	font-size: 8px;
	bottom: 0;
	right: 0;
	transform: rotate(-10deg);
	border: 1px solid #FAFF00;
	background: black;
	border-radius: 2px;
	padding: 1px 3px;
}
.game .tabs p.active{
	color: #FAFF00;
	text-shadow: #FAFF00 0px 0px 16px;
	background: url('@/assets/active-bottom-left.svg') no-repeat bottom left, url('@/assets/active-bottom-right.svg') no-repeat bottom right, url('@/assets/active-top-left.svg') no-repeat top left, url('@/assets/active-top-right.svg') no-repeat top right;
}
.game .tabs p.active:after{
	display: none;
}

.game__content{
	text-align: center;
	position: relative;
	z-index: 1;
	/*background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.55) 25%, rgba(0, 0, 0, 0.55) 75%, rgba(0, 0, 0, 0) 100%);*/
}
.game .title{
	margin: 0 auto;
	margin-bottom: 30px;
	font-size: 40px;
	font-weight: bold;
	text-transform: uppercase;
}
.game__subtitle{
	font-size: 48px;
	font-weight: 900;
	font-style: italic;
	line-height: 1;
	color: #FAFF00;
	margin-bottom: 50px;
}
.game__btn{
	margin-top: 30px;
}

.game__step{
	max-width: 45%;
	border-radius: 16px;
	background-repeat: no-repeat;
	text-align: left;
	background-size: 150px;
	background-color: #000000;
	padding-top: 45px;
	padding-bottom: 25px;
}
.game__step img{
	width: 100%;
}
.game__step-body{
	padding-left: 35px;
	padding-right: 35px;
	padding-top: 25px;
	padding-bottom: 25px;
	background: url('@/assets/block-a-center.svg') repeat-y bottom left;
	background-size: 100%;
}

.game__step1{
	background: url('@/assets/game1-top.svg') no-repeat top center, url('@/assets/block-a-bottom.svg') no-repeat bottom center, url('@/assets/1.svg') no-repeat  90% 20%;
	background-size: 100%, 100%, auto;
	margin-top: 50px;
}
.game__step2{
	background: url('@/assets/game2-top.svg') no-repeat top center, url('@/assets/block-a-bottom.svg') no-repeat bottom center, url('@/assets/2.svg') no-repeat  90% 20%;
	background-size: 100%, 100%, auto;
	margin-left: auto;
	margin-top: -200px;
}
.game__step2 img{
	width: 100%;
}
.game__step3{
	background: url('@/assets/game1-top.svg') no-repeat top center, url('@/assets/block-a-bottom.svg') no-repeat bottom center, url('@/assets/3.svg') no-repeat  90% 20%;
	background-size: 100%, 100%, auto;
	margin-top: -180px;
}
.game__step4{
	background: url('@/assets/block-a-top.svg') no-repeat top center, url('@/assets/block-a-bottom.svg') no-repeat bottom center, url('@/assets/4.svg') no-repeat 90% 20%;
	background-size: 100%, 100%, auto;
	margin-left: auto;
	margin-top: 0px;
}
.game__step4 img{
	width: 100%;
	margin-bottom: -80px;
}
.game__step.game__step5{
	background: url('@/assets/block-a-top.svg') no-repeat top center, url('@/assets/block-a-bottom.svg') no-repeat bottom center, url('@/assets/5.svg') no-repeat 90% 20%;
	background-size: 100%, 100%, auto;
	margin-bottom: 120px;
	margin-top: -300px;
	display: flex;
}
.game__step5 img{
	width: 100%;
	margin-bottom: -90px;
}

.game__step-title{
	font-size: 26px;
	font-weight: 900;
	font-style: italic;
	margin-bottom: 20px;
	text-transform: uppercase;
}
.game__step-title span{
	font-style: normal;
}
.game__btns{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
}
.game__btns .button{
	margin-bottom: 10px;
}
.leaderboard-link{
	font-size: 20px;
	color: white;
}
@media (max-width: 768px) {
	.game{
		margin-top: 50px;
	}
	.game_left, .game_right{
		width: 200px;
	}
	.game_left{
		top: 0;
	}
	.game__title{
		width: 100%;
	}
	.game__subtitle{
		margin-top: -40px;
	}

	.game__step{
		max-width: 100%;
	}
	.game__step1, .game__step2, .game__step3, .game__step4, .game__step5{
		margin: 0;
		margin-top: 50px;
	}
	.game__step2 img, .game__step4 img, .game__step5 img{
		margin: 0;
		width: 100%;
	}
	.game__step.game__step5{
		max-width: 100%;
		margin-bottom: 50px;
		margin-top: 50px;
		flex-direction: column;
	}

	.play-now-button{
		margin-left: auto;
		margin-right: auto;
		margin-top: 0;
	}
	
}

</style>