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
import VDefault from '@/layouts/default.vue';

export default defineComponent({
  computed: {
    layout() {
      return VDefault;
    },
  },
  name: 'App',
});
</script>
