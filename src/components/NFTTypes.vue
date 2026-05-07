<script setup>
    import Icon from '@/components/Icon.vue'
</script>

<template>
    <div class="nft-types">
        <div class="nft-type">
            <Icon type="common" color="#BEBEBE" />
            <p>Base</p>
            <img src="@/assets/common.svg" class="nft-type-token" />
        </div>
        <div class="nft-type">
            <Icon type="rare" />
            <p>Rare</p>
            <img src="@/assets/rare.svg" class="nft-type-token" />
        </div>
        <div class="nft-type">
            <Icon type="common" />
            <p>Epic</p>
            <img src="@/assets/epic.svg" class="nft-type-token" />
        </div>
    </div>
</template>

<style scoped>
    .nft-types{
        overflow: hidden;
        display: flex;
        width: 100%;
        font-family: var(--font-orbitron);
    }
        .nft-types{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        margin-bottom: 50px;
        margin-top: 30px;
    }
    .nft-types .icon{
        width: 30px;
    }
    .nft-type{
        background: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        padding: 0;
        width: 250px;
        text-transform: uppercase;
        font-weight: bold;
        margin: 20px;
    }
    .nft-type p{
        margin: 0;
        margin-bottom: 20px;
    }
    .nft-type img{
        width: 100%;
    }
    .nft-type-lucky-chance{
        color: var(--main-color);
        font-size: 50px;;
    }


    @media (max-width: 768px) {

        .nft-type{
            font-size: 18px;
            width: 28%;
            margin: 10px;
        }
        .nft-type-lucky-chance{
            font-size: 28px;
        }

    }
</style>