<template>
<div class="home-main-preview">
    <img class="mask" src="@/assets/home-preview-mask.svg" />
    <video controlsList="nodownload nofullscreen" style="pointer-events: none;" ref="videoPlayer" autoplay muted loop poster="@/assets/preview.jpg">
      <source src="@/assets/preview.webm" type="video/webm">
      <!--source src="@/assets/preview.mp4" type="video/mp4"-->
    </video> 
</div>
</template>

<script setup>

</script>

<style scoped>
.home-main-preview video{
		width: 99%;
		opacity: 1;
		pointer-events: none;
		user-select: none;
	}
	.home-main-preview img.mask{
		width: 100%;
		position: absolute;
		z-index: 1;
		pointer-events: none;
		user-select: none;
	}
	.home-main-preview .playvideo{
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		z-index: 10;
		font-size: 24px;
		font-weight: bold;
		text-transform: uppercase;
		cursor: pointer;
	}
	.home-main-preview .playicon{
		width: 60px;
		margin-bottom: 10px;
		transition: transform 0.2s;
	}
	.home-main-preview .playvideo:hover .playicon{
		transform: scale(1.1);
	}
</style>