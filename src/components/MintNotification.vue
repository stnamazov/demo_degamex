<script setup>
	
</script>

<template>
    <div class="mint-notification" >
		<RouterLink to="/mint">
			<div class="mint-notification-body">
					<img class="mint-notification-img" src="@/assets/min-skull.svg" />
					<div class="mint-notification-content">
						<div>
							<p><b>Degamers NFT</b></p>
							<p>Mint is Live!</p>
						</div>
						<span class="mint-notification-link">Mint</span>
					</div>
				</div>
		</RouterLink>
    </div>

</template>

<style scoped>


	.mint-notification{
		position: fixed;
		align-items: flex-end;
		justify-content: center;
		bottom: 0px;
		left: 0px;
		color: black;
		z-index: 200;
	}
	.mint-notification a{
		color: black;
		text-decoration: none;
	}
	.mint-notification .body{
		width: 100%;
	}
	.mint-notification-body{
		display: flex;
		align-items: flex-end;
		width: 100%;
	}
	.mint-notification-img{
		width: 150px;
		position: relative;
		margin-left: 20px;
	}
	.mint-notification-content{
		display: flex;
		align-items: center;
		width: 100%;
		margin-left: -40px;
		margin-bottom: 20px;
		padding: 15px;
		padding-left: 60px;
		padding-right: 0px;
		text-transform: uppercase;
		font-size: 18px;
		background: var(--main-color);
		border-radius: 10px;
		box-shadow: 0 0 50px #00000040;
	}
	.mint-notification-content b{
		font-size: 24px;
	}
	.mint-notification-link{
		display: inline-block;
		background: black;
		color: white;
		font-size: 24px;
		padding: 5px 10px;
		margin-left: 20px;
		font-weight: bold;
		text-decoration: none;
		text-transform: uppercase;
		border-radius: 4px;
		font-family: var(--font-orbitron);
	}
	.mint-notification-link:hover{
		transform: scale(1.05);
	}

	@media (max-width: 768px) {
		.mint-notification-wrapper{
			width: 100%;
		}
		.mint-notification-content{
			flex-direction: column;
			align-items: flex-start;
			font-size: 14px;
			width: auto;
			padding-right: 20px;
		}
		.mint-notification-content b{
			font-size: 18px;
		}
		.mint-notification-link{
			margin-top: 10px;
			margin-left: 0;
		}
		.mint-notification-img{
			width: 90px
		}
	}
</style>
