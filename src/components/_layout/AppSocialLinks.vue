<script setup>
	import { computed } from 'vue'
</script>

<template>
	<div class="social-links">
        <!--a href="https://twitter.com/DeGameXcom" target="_blank" class="social-link"><img alt="Twitter" src="@/assets/icon-tw.svg" /></a>
        <a href="https://t.me/degamexbot"  target="_blank" class="social-link"><img alt="Telegram" src="@/assets/icon-tg.svg" /></a>
        <a href="https://discord.gg/qdtfBj7xtS"  target="_blank" class="social-link"><img alt="Telegram" src="@/assets/icon-discord.svg" /></a-->
	</div>
</template>

<style scoped>
	.social-links{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: -10px;
    }
    .social-link{
        width: 32px;
        margin-left: 10px;
        padding: 5px;
    }
    .social-link img{
        width: 100%;
        display: block;
    }
    .social-link:hover{
        border-top: none;
        background: url('@/assets/active-bottom-left.svg') no-repeat bottom left, url('@/assets/active-bottom-right.svg') no-repeat bottom right, url('@/assets/active-top-left.svg') no-repeat top left, url('@/assets/active-top-right.svg') no-repeat top right;
    }
</style>