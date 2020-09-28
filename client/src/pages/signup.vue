<template>
  <div>
    <h1 class="font-bold mb-6 text-center text-2xl">Create an account</h1>
    <v-card class="max-w-md mx-auto" padded>
      <form class="gap-6 grid" @submit.prevent="onSubmit">
        <v-labeled-input
          autofocus
          label="Username"
          placeholder="Enter username"
          required />

        <v-labeled-input
          label="Email"
          placeholder="Enter email address"
          required
          type="email" />

        <v-labeled-input
          label="Password"
          placeholder="Enter password"
          required
          type="password" />

        <v-labeled-input
          label="Confirm password"
          placeholder="Enter password confirmation"
          required
          type="password" />

        <div class="flex justify-end">
          <v-button theme="primary" type="submit">
            Sign up
          </v-button>
        </div>
      </form>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VButton from '@/components/button.vue';
import VCard from '@/components/card.vue';
import VLabeledInput from '@/components/labeled-input.vue';

export default defineComponent({
  components: {
    VButton,
    VCard,
    VLabeledInput,
  },
  methods: {
    onSubmit() {
      console.log('creating account...');
    },
  },
});
</script>