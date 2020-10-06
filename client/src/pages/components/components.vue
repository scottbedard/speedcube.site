<template>
  <h1 class="font-bold mb-4 text-2xl">
    Components
  </h1>

  <v-input
    v-model="filter"
    autofocus
    placeholder="Search components"
    type="search" />

  <div
    v-for="example in examples"
    :key="example.key">
    <h2
      v-text="example.key"
      class="font-bold mb-4 mt-16" />
    <component :is="example.component" />
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';
import VInput from '@/components/input.vue';
import examples from './examples/index';

export default defineComponent({
  data() {
    return {
      filter: '',
    };
  },
  components: {
    VInput,
  },
  computed: {
    examples() {
      const arr = [];

      let key: keyof typeof examples;

      for (key in examples) {
        if (key.includes(this.filter)) {
          arr.push({ key, component: defineAsyncComponent(examples[key]) });
        }
      }
      
      return arr;
    },
  },
});
</script>