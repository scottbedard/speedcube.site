<template>
  <h1 class="font-bold mb-4 text-3xl">
    Components
  </h1>

  <v-input
    autofocus
    placeholder="Search components"
    type="search"
    :value="filter"
    @input="onFilter" />

  <div
    v-for="example in examples"
    :key="example.key">
    <h2 class="font-bold mb-4 mt-16 text-xl">
      <router-link
        v-text="example.key"
        :to="{
          name: 'components',
          query: {
            filter: example.key,
          },
        }" />
    </h2>
    <component :is="example.component" />
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';
import VInput from '@/components/input.vue';
import examples from './examples/index';

export default defineComponent({
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
    filter(): string {
      return typeof this.$route.query.filter === 'string'
        ? this.$route.query.filter
        : '';
    }
  },
  methods: {
    onFilter(e: Event) {
      const value = (e.target as HTMLInputElement).value.trim();

      this.$router.replace({
        query: {
          filter: value || undefined,
        },
      });
    },
  },
});
</script>