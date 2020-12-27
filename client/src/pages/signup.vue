<template>
  <div class="gap-6 grid">
    <h1 class="font-bold text-center text-2xl">Create an account</h1>
    <p v-if="createUserIsThrottled" class="text-center text-red-500">
      Registrations is throttled, please try again later.
    </p>
    <div>
      <v-card class="max-w-md mx-auto" padded>
        <form class="gap-6 grid" @submit.prevent="onSubmit">
          <v-labeled-input
            v-model="createUserData.username"
            autofocus
            label="Username"
            name="username"
            placeholder="Enter username"
            required
            :disabled="createUserIsLoading"
            :error-message="createUserValidationErrors?.username?.[0]" />

          <v-labeled-input
            v-model="createUserData.email"
            label="Email"
            name="email"
            placeholder="Enter email address"
            required
            type="email"
            :disabled="createUserIsLoading"
            :error-message="createUserValidationErrors?.email?.[0]" />

          <v-labeled-input
            v-model="createUserData.password"
            label="Password"
            name="password"
            placeholder="Enter password"
            required
            type="password"
            :disabled="createUserIsLoading"
            :error-message="createUserValidationErrors?.password?.[0]" />

          <v-labeled-input
            v-model="createUserData.passwordConfirmation"
            label="Confirm password"
            name="passwordConfirmation"
            placeholder="Enter password confirmation"
            required
            type="password"
            :disabled="createUserIsLoading" />

          <div class="flex justify-end">
            <v-button
              type="submit"
              :loading="createUserIsLoading">
              Sign up
            </v-button>
          </div>
        </form>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useCreateUser } from '@/app/store/user/behaviors/create-user';
import VButton from '@/components/button.vue';
import VCard from '@/components/card.vue';
import VLabeledInput from '@/components/labeled-input.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const {
      createUser,
      createUserData,
      createUserIsLoading,
      createUserIsThrottled,
      createUserValidationErrors,
    } = useCreateUser();

    const router = useRouter();

    const onSubmit = () => {
      return createUser().then(() => {
        router.replace({
          name: 'solve',
          params: {
            puzzle: '3x3',
          },
        });
      });
    }

    return {
      createUserData,
      createUserIsLoading,
      createUserIsThrottled,
      createUserValidationErrors,
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