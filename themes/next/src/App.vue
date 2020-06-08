<template>
  <div>
    Count: {{ count }}<br />
    Squared: {{ squared }}<br />
    <button @click="add(1)">+1</button>
    <button @click="add(-1)">-1</button>
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
