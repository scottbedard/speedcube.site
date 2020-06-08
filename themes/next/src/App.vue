<template>
  <div>
    Count: {{ count }}<br />
    <button @click="add(1)">+1</button>
    <button @click="add(-1)">-1</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  setup() {
    const count = ref<number>(0);

    const add = (n: number) => count.value += n;

    return {
      add,
      count,
    };
  },
});
</script>
