<template>
  <div class="grid gap-6">
    <h1 class="font-bold text-center text-2xl">Welcome back</h1>
    <p v-if="loginFailed" class="text-center text-red-500">
      Invalid username / password combination.
    </p>
    <div>
      <v-card class="max-w-md mx-auto" padded>
        <form
          class="gap-6 grid"
          ref="formEl"
          @submit.prevent="onSubmit">
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
              :loading="loginIsLoading">
              Login
            </v-button>
          </div>
        </form>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useLogin } from '@/app/store/user/behaviors/login';
import { useRouter } from 'vue-router';
import VButton from '@/components/button.vue';
import VCard from '@/components/card.vue';
import VLabeledInput from '@/components/labeled-input.vue';

export default defineComponent({
  setup() {
    const formEl = ref<HTMLElement | null>(null);

    const {
      login,
      loginData,
      loginFailed,
      loginIsLoading,
    } = useLogin();

    const router = useRouter();

    const onSubmit = async () => {
      return login().then(() => {
        router.replace({
          name: 'solve',
          params: {
            puzzle: '3x3',
          },
        });
      });
    }

    return {
      formEl,
      loginData,
      loginFailed,
      loginIsLoading,
      onSubmit,
    };
  },
  components: {
    VButton,
    VCard,
    VLabeledInput,
  },
});
</script>
