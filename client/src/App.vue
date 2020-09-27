<template>
  <div>
    <h1>Vue 3</h1>
    <div>Count: {{ count }}</div>
    <button @click="inc">+1</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const count = ref(0);

    const inc = () => count.value += 1;

    return {
      count,
      inc,
    };
  },
};
</script>
