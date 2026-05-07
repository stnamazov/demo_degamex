<script setup>
import { computed } from 'vue'
import { defineProps } from 'vue'

const props = defineProps({
  tokenId: { type: [Number, String], required: true },
  size: { type: Number, default: 200 },
})

const eyeIndex = computed(() => {
  const n = Number(props.tokenId)
  const safe = Number.isFinite(n) ? n : 0
  return (Math.abs(safe) % 5) + 1
})
</script>

<template>
  <div class="degamer-wrapper" :style="{ width: `${size}px`, height: `${size}px` }">
    <div class="degamer">
      <img class="layer" src="@/assets/spins-degamer-body.svg" />
      <div class="degamer-head">
        <div class="degamer-eyes">
          <img v-show="eyeIndex === 1" class="layer" src="@/assets/spins-degamer-eyes-1.svg" />
          <img v-show="eyeIndex === 2" class="layer" src="@/assets/spins-degamer-eyes-2.svg" />
          <img v-show="eyeIndex === 3" class="layer" src="@/assets/spins-degamer-eyes-3.svg" />
          <img v-show="eyeIndex === 4" class="layer" src="@/assets/spins-degamer-eyes-4.svg" />
          <img v-show="eyeIndex === 5" class="layer" src="@/assets/spins-degamer-eyes-5.svg" />
        </div>
        <img class="layer" src="@/assets/spins-degamer-head.svg" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.degamer-wrapper{
  position: relative;
  overflow: hidden;
}
.degamer{
  position: absolute;
  inset: 0;
  transform-origin: 80% 100%;
  animation: degamer 1s ease-in-out infinite alternate;
}
.layer{
  width: 100%;
  height: auto;
  display: block;
  user-select: none;
  pointer-events: none;
}
.degamer-head{
  position: absolute;
  inset: 0;
  animation: degamer_head 0.6s ease-in-out infinite alternate;
}
.degamer-eyes{
  position: absolute;
  inset: 0;
}

@keyframes degamer {
  0%{ transform: rotate(0.5deg) translateY(2px); }
  100%{ transform: rotate(-0.5deg) translateY(-2px); }
}
@keyframes degamer_head {
  0%{ transform: rotate(1deg); top: 0px; }
  100%{ transform: rotate(-1deg); top: 6px; }
}
</style>

