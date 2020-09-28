<template>
  <div class="flex h-16 items-center justify-between px-6">
    <!-- logo -->
    <router-link :to="{ name: 'home' }">
      speedcube.site
    </router-link>
    
    <!-- mobile nav -->
    <div class="sm:hidden">
      Mobile nav
    </div>

    <!-- desktop nav -->
    <nav class="gap-6 hidden sm:flex">
      <router-link
        v-for="(link, index) in links"
        v-text="link.text"
        :key="index"
        :to="link.to" />
    </nav>
  </div>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const links = [
      {
        text: 'Records',
        to: {
          name: 'records',
        },
      },
      {
        text: 'Signup',
        to: {
          name: 'signup',
        },
      },
    ];

    return {
      links,
    };
  },
});
</script>
