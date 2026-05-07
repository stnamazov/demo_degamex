<script setup>
import { reactive, toRefs, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppSocialLinks from '@/components/_layout/AppSocialLinks.vue'
import AppHeaderAccount from '@/components/_layout/AppHeaderAccount.vue'

const route = useRoute()
const state = reactive({
	isMenuVisible: false
})
const { isMenuVisible } = toRefs(state)
watch(() => route.path, function(){
	state.isMenuVisible = false
})

</script>

<template>

	<header class="font-orbitron container">
		
			<RouterLink to="/" class="logo"><img alt="DeGameX" src="@/assets/logo.svg" /></RouterLink>
			
			<div class="menu" :class="{active : isMenuVisible}">
				<nav>
					<RouterLink to="/" class="logo"><img alt="DeGameX" src="@/assets/logo.svg" /></RouterLink>
					<RouterLink to="/arena">Arena</RouterLink>
					<RouterLink to="/leaderboard" >Leaderboard</RouterLink>
					<RouterLink to="/mint" class="mint" >Mint NFT</RouterLink>
					<AppSocialLinks class="social-links"/>
					<AppHeaderAccount class="ml-auto mr-auto lg:mr-0"/>
				</nav>
			</div>

			<AppSocialLinks class="social-links social-m-links"/>

			<button v-on:click="isMenuVisible = !isMenuVisible" class="menu-toggle" :class="{close : isMenuVisible}"></button>

	</header>

</template>

<style scoped>
header{
	z-index: 1000;
	height: 100px;
	display: flex;
	align-items: center;
	font-size: 18px;
}

.menu{
	display: flex;
	align-items: center;
	width: 100%;
}

.menu nav{
	display: flex;
	align-items: center;
	width: 100%;
}

a{
	margin-left: 10px;
	cursor: pointer;
	text-decoration: none;
	text-transform: uppercase;
	font-weight: bold;
	color: #ffffff;
	padding: 5px 10px;
	text-align: center;
}
a:hover{
	background: url('@/assets/active-bottom-left.svg') no-repeat bottom left, url('@/assets/active-bottom-right.svg') no-repeat bottom right, url('@/assets/active-top-left.svg') no-repeat top left, url('@/assets/active-top-right.svg') no-repeat top right;
}
a.router-link-active{
	color: var(--main-color);
	text-shadow: var(--main-color) 0px 0px 16px;
	background: url('@/assets/active-bottom-left.svg') no-repeat bottom left, url('@/assets/active-bottom-right.svg') no-repeat bottom right, url('@/assets/active-top-left.svg') no-repeat top left, url('@/assets/active-top-right.svg') no-repeat top right;
	pointer-events: none;
}
a.router-link-active span{
	color: #ffffff;
}
a.logo{
	margin-left: 0;
	opacity: 1;
	padding: 0;
}
a.logo:hover{
	margin-top: 0px;
	border-top: none;
	transform: scale(1.1);
	background: none;
}
a.logo.router-link-active{
	background: none;
}
a.logo img{
	height: 16px;
	margin-top: 5px;
	margin-right: 50px;
}

a.mint{
	background: var(--main-color);
	color: black;
	border-radius: 5px;
	cursor: pointer;
}
a.mint:hover{
	transform: scale(1.1);
}
a.mint.router-link-active{
	background: none;
	color: var(--main-color);
	background: url('@/assets/active-bottom-left.svg') no-repeat bottom left, url('@/assets/active-bottom-right.svg') no-repeat bottom right, url('@/assets/active-top-left.svg') no-repeat top left, url('@/assets/active-top-right.svg') no-repeat top right;
	pointer-events: none;
}

.social-links{
	margin-left: 20px;
}
.social-m-links{
	display: none;
}

.menu a.logo{
	display: none;
}
.menu-toggle{
	display: none;
	width: 30px;
	height: 30px;
	border: none;
	background: none;
	background-image: url('@/assets/icon_menu.svg');
	background-size: cover;	
}
.menu-toggle.close{
	background-image: url('@/assets/icon_close.svg');
}

.connect{
	margin-left: auto;
}

.arena-link{
	cursor: pointer;
	position: relative;
}
.arena-link:after{
	content: 'Coming this week';
	position: absolute;
	bottom: -50px;
	left: 0;
	font-size: 10px;
	background: var(--main-color);
	color: black;
	border-radius: 6px;
	padding: 10px;
	opacity: 0;
	transition: all 0.5s;
}
.arena-link:hover{
	background: none;
}
.arena-link:hover::after{
	opacity: 1;
}

@media (max-width: 1024px) {

	a.logo img{
		margin-left: 0;
		opacity: 1;
		height: 15px;
		margin-right: auto;
	}
	
	.menu-toggle{
		margin-left: auto;
		display: block;
		position: relative;
		z-index: 1200;
	}
	.menu{
		display: none;
	}
	.menu a.logo{
		display: block;
		margin: 0;
	}
	.menu a.logo img{
		width: 100%;
	}
	.menu.active{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: fixed;
		width: 100%;
		min-height: 100vh;
		height: 100vh;
		top: 0;
		left: 0;
		background: black;
		z-index: 1100;
	}
	.menu nav{
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.menu.active a{
		margin-left: 0;
		margin-bottom: 30px;
		font-size: 20px;
	}
	.social-links{
		margin-left: 0px;
		display: none;
	}
	.social-m-links{
		display: flex;
		margin-left: 30px;
	}
	.connect{
		margin: 0 auto;
	}

}
</style>
