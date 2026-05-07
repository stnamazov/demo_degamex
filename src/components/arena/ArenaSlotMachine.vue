<template>
  <div class="slot-machine">
    <div class="slot" v-for="(finalNumber, index) in finalNumbers" :key="index">
      <div class="numbers" :style="{ transform: `translateY(-${positions[index]}em)` }" >
        <div class="number" v-for="n in numbers" :key="n">{{ n }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, nextTick } from 'vue';

const props = defineProps({
  finalNumbers: Array
});

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const positions = ref([0, 0, 0]);

const animateSlot = (index, finalPosition) => {
  const keyframes = [
    { transform: `translateY(0em)` },
    { transform: `translateY(-${numbers.length * 2 * 3}em)` }, // 3 полных оборота
    { transform: `translateY(-${finalPosition}em)` }
  ];
  const delay = index * 300; // задержка в мс, увеличивается с каждым барабаном
  const timing = {
    duration: 2000 + delay, // общая длительность включает задержку
    easing: 'ease-out',
    delay: delay // добавляем задержку перед началом анимации
  };
  const slotElement = document.querySelector(`.slot:nth-child(${index + 1}) .numbers`);
  slotElement.animate(keyframes, timing);
};

watchEffect(() => {
  positions.value = props.finalNumbers.map(n => (n - 1) * 2); // Подготовка конечных позиций
  nextTick(() => {
    props.finalNumbers.forEach((num, index) => {
      animateSlot(index, positions.value[index]);
    });
  });
});
</script>

<style scoped>
.slot-machine {
  display: flex;
}

.slot {
  width: 2em;
  height: 2em;
  overflow: hidden;
  border: 1px solid white;
  margin-right: 0.5em;
}

.number {
  height: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>