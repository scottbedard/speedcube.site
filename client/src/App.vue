<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>

<template>
  <div class="flex h-screen items-center justify-center p-6 text-center">
    <div>
      <h1 class="text-2xl">Soon...</h1>
      <div>
        Count: {{ count }}<br />
        Doubled: {{ doubled }}<br />
        <button @click="inc">+1</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { double } from '@/math';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const count = ref(0);
    const inc = () => count.value++;
    const doubled = computed(() => double(count.value));

    return {
      count,
      doubled,
      inc,
    };
  },
  name: 'App',
});
</script>
