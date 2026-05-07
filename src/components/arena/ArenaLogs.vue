<script setup>
    import { defineProps } from 'vue'

    const props = defineProps({
        arena: { type: Object, default: {} }
    })

    function getAddress(player){
        return props.arena[`player${player}_address`].substr(0,4) + "..." + props.arena[`player${player}_address`].substr(-4)
    }

    // start session
    // 0x345...987 connected
    // 0x345...987 vitalik 0x345...987 5600

</script>

<template>
    <div>
        <div v-for="(log, index) in props.arena.logs" v-bind:key="index" class="text-sm">{{log}}</div>
    </div>
</template>

<style scoped>

</style>