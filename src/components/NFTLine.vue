<template>
   <div class="nft-line-wrapper">
        <div class="nft-line">
            <img src="@/assets/nft/d10.svg" />
            <img src="@/assets/nft/d2.svg" />
            <img src="@/assets/nft/d9.svg" />
            <img src="@/assets/nft/d3.svg" />
            <img src="@/assets/nft/d7.svg" />
            <img src="@/assets/nft/d4.svg" />
            <img src="@/assets/nft/d6.svg" />
            <img src="@/assets/nft/d8.svg" />
            <img src="@/assets/nft/d5.svg" />
            <img src="@/assets/nft/d10.svg" />
            <img src="@/assets/nft/d2.svg" />
            <img src="@/assets/nft/d9.svg" />
            <img src="@/assets/nft/d3.svg" />
            <img src="@/assets/nft/d7.svg" />
            <img src="@/assets/nft/d4.svg" />
            <img src="@/assets/nft/d6.svg" />
            <img src="@/assets/nft/d8.svg" />
            <img src="@/assets/nft/d5.svg" />
        </div>
   </div>
</template>

<script setup>

</script>

<style scoped>
    .nft-line-wrapper{
        overflow: hidden;
        display: flex;
        width: 100%;
    }
    .nft-line{
        display: flex;
        justify-content: space-between;
        width: 6000px;
        animation: line 15s linear infinite;
    }
    .nft-line img{
        width: 100%;
        max-width: 270px;
        margin: 15px;
    }
    @keyframes line {
        0%{
            margin-left: 0;
        } 
        100%{
            margin-left: -2700px;
        } 
    }
</style>