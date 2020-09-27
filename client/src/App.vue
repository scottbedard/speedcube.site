<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Default from '@/layouts/Default.vue';

export default defineComponent({
  computed: {
    layout() {
      return Default;
    },
  },
  name: 'App',
});
</script>
