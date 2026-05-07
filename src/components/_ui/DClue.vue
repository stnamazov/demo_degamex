<script setup>
import Icon from '@/components/Icon.vue'
import { defineProps, defineEmits, ref } from 'vue'
const emit = defineEmits(['close'])
const props = defineProps({
    html: String
})
const isShowClue = ref(false)

</script>

<template>
    <div class="relative">
        <Icon @click="isShowClue = !isShowClue" type="q" color="#FFFFFF" :class="false ? 'opacity-70' : 'opacity-30'" class="icon size-6 cursor-pointer hover:scale-105 hover:opacity-80" />
        <div v-if="isShowClue" class="absolute top-10 z-10 text-sm w-[220px] bg-black/90 p-3 rounded-md" v-html="props.html" ></div>
    </div>
</template>