<template>
  <div class="gap-6 grid max-w-8xl mx-auto md:grid-cols-5 lg:grid-cols-4">
    <div class="md:col-span-2 lg:col-span-1">
      <v-card-header>My Account</v-card-header>
      <v-card>
        <v-card-nav
          label="User navigation"
          :links="links" />
      </v-card>
    </div>
    <div class="md:col-span-3">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VCard from '@/components/card.vue';
import VCardHeader from '@/components/card-header.vue';
import VCardNav from '@/components/card-nav.vue';

export default defineComponent({
  setup() {
    const links = [
      {
        icon: 'user',
        text: 'Profile',
        to: {
          name: 'account-profile',
        },
      },
      {
        icon: 'lock',
        text: 'Security',
        to: {
          name: 'account-security',
        },
      },
    ];

    return {
      links,
    };
  },
  components: {
    VCard,
    VCardHeader,
    VCardNav,
  },
});
</script>
