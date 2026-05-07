<script setup>
import { defineProps, defineEmits, ref } from 'vue'
const emit = defineEmits(['changePage'])
const props = defineProps({
    pages: Number,
    currentPage: Number
})


</script>

<template>
    <div class="flex gap-2">
        <button @click="emit('changePage', props.currentPage - 1)" :class="{'opacity-20': props.currentPage != 1}" class="flex items-center justify-center p-2 rounded-md bg-black/20">
            Prev
        </button>
        <button @click="emit('changePage', props.currentPage + 1)" class="flex items-center justify-center p-2 rounded-md bg-black/20" >
            Next
        </button>
    </div>
</template>