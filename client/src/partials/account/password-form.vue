<template>
  <div>
    <v-card-header>
      Change Password
    </v-card-header>
    <v-card padded>
      <form
        class="grid gap-6 max-w-lg mx-auto"
        @submit.prevent="onSubmit">
        <v-labeled-input
          v-model="updateUserData.password"
          autofocus
          label="New Password"
          placeholder="Enter new password"
          required
          type="password"
          :disabled="updateUserIsLoading"
          :error-message="updateUserValidationErrors?.password?.[0]" />
        <v-labeled-input
          v-model="updateUserData.passwordConfirmation"
          label="Confirm New Password"
          placeholder="Enter new password again"
          required
          type="password"
          :disabled="updateUserIsLoading"
          :error-message="updateUserValidationErrors?.passwordConfirmation?.[0]" />
        <div class="flex justify-end">
          <v-button type="submit" :loading="updateUserIsLoading">
            Save
          </v-button>
        </div>
      </form>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { fireAlert } from '@/app/store/alert/actions';
import { useUpdateUser } from '@/app/store/user/behaviors/update-user';
import VButton from '@/components/button.vue';
import VCard from '@/components/card.vue';
import VCardHeader from '@/components/card-header.vue';
import VLabeledInput from '@/components/labeled-input.vue';

export default defineComponent({
  setup() {
    const {
      updateUser,
      updateUserData,
      updateUserIsLoading,
      updateUserValidationErrors,
    } = useUpdateUser();

    const onSubmit = () => {
      updateUser().then(() => {
        fireAlert({
          type: 'success',
          message: 'Password has been changed',
        });
      });
    };

    return {
      onSubmit,
      updateUserData,
      updateUserIsLoading,
      updateUserValidationErrors,
    };
  },
  components: {
    VButton,
    VCard,
    VCardHeader,
    VLabeledInput,
  },
});
</script>
