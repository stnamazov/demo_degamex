<script setup>
	import { defineProps } from 'vue'
	const props = defineProps({
		data: {
			type: Object,
		},

        isRow: {
			type: Boolean,
            default: false
		}
	})
</script>

<template>
    <div class="lootbox-item" :class="{row: isRow}">
        <div class="lootbox-item-image">
            <img v-if="!props.data.imgUrl" src="@/assets/lootbox/lootbox-item-base-lootbox.svg" />
            <img v-else :src="props.data.imgUrl" />
        </div>
        <p class="lootbox-item-title">{{ props.data.title }}</p>
        <p class="lootbox-item-subtitle">{{ props.data.subtitle }}</p>
    </div>
</template>

<style scoped>
    .lootbox-item{
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        animation: show-item 0.5s;
    }
    .lootbox-item-image{
        width: 150px;
    }
    .lootbox-item-image img{
        width: 100%;
    }
    .lootbox-item-title,  .lootbox-item-subtitle{
        font-size: 32px;
        font-weight: bold;
        font-family: var(--title);
        text-transform: uppercase;
    }
    .lootbox-item-subtitle{
        font-size: 16px;
    }

    .lootbox-item.row{
        flex-direction: row;
        animation: none;
    }
    .lootbox-item.row .lootbox-item-title, .lootbox-item.row .lootbox-item-subtitle{
        font-size: 16px;
    }
    .lootbox-item.row .lootbox-item-image{
        width: 50px;
        margin-right: 20px;
    }
    .lootbox-item-title{
        margin-right: 10px;
    }
    @keyframes show-item {
        0%{
            opacity: 0;
            transform: scale(0.1);
            top: -100px;
        }
        50%{
            opacity: 0.5;
            transform: scale(1.3);
            top: -200px;
        }
        100%{
            opacity: 1;
            top: 0px;
        }
    }
</style>