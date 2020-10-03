<template>
  <h1 class="font-bold mb-6 text-center text-2xl">Welcome back</h1>
  <v-card class="max-w-md mx-auto" padded>
    <form class="gap-6 grid" @submit.prevent="onSubmit">
      <v-labeled-input
        v-model="loginData.username"
        autofocus
        label="Username"
        name="username"
        placeholder="Enter username"
        required
        :disabled="loginIsLoading" />

      <v-labeled-input
        v-model="loginData.password"
        label="Password"
        name="password"
        placeholder="Enter password"
        required
        type="password"
        :disabled="loginIsLoading" />

      <div class="flex justify-end">
        <v-button
          type="submit"
          :disabled="loginIsLoading">
          Login
        </v-button>
      </div>
    </form>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useLogin } from '@/app/store/user/behaviors/login';
import VButton from '@/components/button.vue';
import VCard from '@/components/card.vue';
import VLabeledInput from '@/components/labeled-input.vue';

export default defineComponent({
  setup() {
    const {
      login,
      loginData,
      loginIsLoading,
    } = useLogin();

    return {
      login,
      loginData,
      loginIsLoading,
    };
  },
  components: {
    VButton,
    VCard,
    VLabeledInput,
  },
  methods: {
    onSubmit() {
      this.login().then(() => {
        this.$router.replace({ name: 'home' });
      });
    },
  },
});
</script>
