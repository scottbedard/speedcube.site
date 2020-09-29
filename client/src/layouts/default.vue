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
  <div class="px-6">
    <slot />
  </div>
</template>

<script lang="ts">
import { currentUser } from '@/app/state/current-user';
import { computed, defineComponent } from 'vue';
import { identity } from 'lodash-es';

export default defineComponent({
  setup() {
    const links = computed(() => [
      {
        text: 'Records',
        to: {
          name: 'records',
        },
      },
      !currentUser.value && {
        text: 'Sign up',
        to: {
          name: 'signup',
        },
      },
    ].filter(identity));

    return {
      currentUser,
      links,
    };
  },
});
</script>
