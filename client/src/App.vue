<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>

<template>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>
