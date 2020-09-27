<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>

<template>
  <div class="flex h-screen items-center justify-center p-6 text-center">
    <h1 class="text-2xl">Soon...</h1>
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
