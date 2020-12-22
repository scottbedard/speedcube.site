<template>
  <div class="flex h-24 items-center justify-between px-6">
    <!-- logo -->
    <router-link class="font-bold text-xl" :to="{ name: 'home' }">
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

  <div class="p-6">
    <v-renderer>
      <slot />
    </v-renderer>
  </div>

  <div class="bottom-0 fixed right-0 z-20">
    <v-alerts />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { identity } from 'lodash-es';
import { isAuthenticated } from '@/app/store/user/getters';
import VAlerts from '@/partials/alerts.vue'; 
import VRenderer from '@/components/three/renderer.vue';

export default defineComponent({
  setup() {
    const links = computed(() => [
      {
        text: 'Solve',
        to: {
          name: 'solve',
          params: {
            puzzle: '3x3',
          },
        },
      },
      !isAuthenticated.value && {
        text: 'Sign up',
        to: {
          name: 'signup',
        },
      },
      isAuthenticated.value
        ? {
          text: 'Logout',
          to: {
            name: 'logout',
          },
        }
        : {
          text: 'Login',
          to: {
            name: 'login',
          },
        },
    ].filter(identity));

    return {
      links,
    };
  },
  components: {
    VAlerts,
    VRenderer,
  },
});
</script>
