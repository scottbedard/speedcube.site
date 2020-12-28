<template>
  <div class="gap-6 grid max-w-8xl mx-auto md:grid-cols-3">
    <div>
      <v-card>
        <v-card-nav
          label="User navigation"
          :links="[
            {
              icon: 'user',
              text: 'Profile',
              to: {
                name: 'account-profile',
              },
            },
            {
              icon: 'lock',
              text: 'Change Password',
              to: {
                name: 'account-security',
              },
            },
          ]" />
      </v-card>
    </div>
    <div class="md:col-span-2">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent } from 'vue';
import VCard from '@/components/card.vue';
import VCardNav from '@/components/card-nav.vue';

export default defineComponent({
  components: {
    VCard,
    VCardNav,
  },
});
</script>
