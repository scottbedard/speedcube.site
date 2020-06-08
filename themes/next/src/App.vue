<style>
/* purgecss start ignore */
@tailwind base;
@tailwind components;
/* purgecss end ignore */
@tailwind utilities;
</style>

<template>
  <div class="p-12">
    Count: {{ count }}<br />
    Squared: {{ squared }}<br />
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="add(1)">+1</button>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="add(-1)">-1</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { square } from '@/math';

export default defineComponent({
  setup() {
    const count = ref<number>(0);
    const squared = computed(() => square(count.value));

    const add = (n: number) => count.value += n;

    return {
      add,
      count,
      squared,
    };
  },
});
</script>
