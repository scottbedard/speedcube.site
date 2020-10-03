<template>
  <h1 class="font-bold mb-6 text-center text-2xl">Create an account</h1>
  <v-card class="max-w-md mx-auto" padded>
    <form class="gap-6 grid" @submit.prevent="onSubmit">
      <v-labeled-input
        v-model="createUserData.username"
        autofocus
        label="Username"
        placeholder="Enter username"
        required
        :disabled="createUserIsLoading" />

      <v-labeled-input
        v-model="createUserData.email"
        label="Email"
        placeholder="Enter email address"
        required
        type="email"
        :disabled="createUserIsLoading" />

      <v-labeled-input
        v-model="createUserData.password"
        label="Password"
        placeholder="Enter password"
        required
        type="password"
        :disabled="createUserIsLoading" />

      <v-labeled-input
        v-model="createUserData.passwordConfirmation"
        label="Confirm password"
        placeholder="Enter password confirmation"
        required
        type="password"
        :disabled="createUserIsLoading" />

      <div class="flex justify-end">
        <v-button
          type="submit"
          :disabled="createUserIsLoading">
          Sign up
        </v-button>
      </div>
    </form>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useCreateUser } from '@/app/store/user/behaviors/create-user';
import VButton from '@/components/button.vue';
import VCard from '@/components/card.vue';
import VLabeledInput from '@/components/labeled-input.vue';

export default defineComponent({
  setup() {
    const {
      createUser,
      createUserData,
      createUserIsLoading,
    } = useCreateUser();

    return {
      createUser,
      createUserData,
      createUserIsLoading,
    };
  },
  components: {
    VButton,
    VCard,
    VLabeledInput,
  },
  methods: {
    onSubmit() {
      this.createUser().then(() => {
        this.$router.replace({ name: 'solve' });
      });
    },
  },
});
</script>