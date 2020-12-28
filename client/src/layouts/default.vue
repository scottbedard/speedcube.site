<template>
  <div class="flex h-24 items-center justify-between px-6">
    <div class="gap-6 flex items-center md:gap-12">
      <!-- logo -->
      <router-link class="flex font-bold items-center text-2xl" :to="{ name: 'home' }">
        <v-icon class="mr-2" name="box" size="7" stroke="2" />
        speedcube.site
      </router-link>

      <!-- desktop nav -->
      <router-link
        v-for="(link, index) in links"
        v-text="link.text"
        :class="{
          'text-green-500': link.to.name === route.name,
        }"
        :key="index"
        :to="link.to" />
    </div>
    
    <!-- mobile nav -->
    <div class="sm:hidden">
      Mobile nav
    </div>

    <!-- user -->
    <div
      v-if="isAuthenticated"
      class="flex gap-6 items-center">
      <div class="relative">
        <a
          class="flex items-center"
          href="#"
          @click.prevent.stop="expandDropdown">
          <v-icon class="mr-1" name="chevron-down" size="5" stroke="2" />
          <v-icon name="user" size="7" stroke="2" />
        </a>
        <v-card
          v-if="dropdownIsExpanded"
          class="absolute mt-6 right-0 top-full w-64 z-10">
          <v-card-nav label="User navigation" :links="[
            {
              icon: 'user',
              text: 'My Account',
              to: {
                name: 'account-profile',
              },
            },
            {
              icon: 'bar-chart-2',
              text: 'Stats',
              to: {
                name: 'users-user',
                params: {
                  username: currentUser.username,
                },
              },
            },
            {
              icon: 'log-out',
              text: 'Sign Out',
              to: {
                name: 'logout',
              },
            },
          ]" />
        </v-card>
      </div>
    </div>

    <!-- guest -->
    <div v-else class="gap-6 flex items-center md:gap-12">
      <router-link :to="{ name: 'login' }">
        Sign in
      </router-link>
      <v-button size="sm" :to="{ name: 'signup' }">Create account</v-button>
    </div>
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
/* eslint-disable */
import { computed, defineComponent, ref } from 'vue';
import { currentUser } from '@/app/store/user/state';
import { identity } from 'lodash-es';
import { isAuthenticated } from '@/app/store/user/getters';
import { useEventListener } from '@vueuse/core';
import { useRoute } from 'vue-router';
import VAlerts from '@/partials/alerts.vue';
import VButton from '@/components/button.vue';
import VCard from '@/components/card.vue';
import VCardNav from '@/components/card-nav.vue';
import VIcon from '@/components/icon.vue';
import VRenderer from '@/components/three/renderer.vue';

export default defineComponent({
  setup() {
    const dropdownIsExpanded = ref(false);

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
      {
        text: 'Records',
        to: {
          name: 'records',
        },
      },
    ].filter(identity));

    const route = useRoute();

    const expandDropdown = () => {
      dropdownIsExpanded.value = true;
    }

    useEventListener(document, 'click', (e) => {
      dropdownIsExpanded.value = false;
    });

    return {
      currentUser,
      dropdownIsExpanded,
      expandDropdown,
      isAuthenticated,
      links,
      route,
    };
  },
  components: {
    VAlerts,
    VButton,
    VCard,
    VCardNav,
    VIcon,
    VRenderer,
  },
});
</script>
