<template>
  <h1 class="font-bold text-2xl">
    Components
  </h1>

  <div
    v-for="example in examples"
    :key="example.key">
    <h2
      v-text="example.key"
      class="font-bold mb-4 mt-12" />
    <component :is="example.component" />
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';
import examples from './examples/index';

export default defineComponent({
  computed: {
    examples() {
      const arr = [];

      let key: keyof typeof examples;

      for (key in examples) {
        arr.push({ key, component: defineAsyncComponent(examples[key]) });
      }
      
      return arr;
    },
  },
});
</script>