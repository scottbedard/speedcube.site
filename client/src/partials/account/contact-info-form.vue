<template>
  <div>
    <v-card-header>
      Contact Information
    </v-card-header>
    <v-card padded>
      <form
        class="grid gap-6 max-w-lg mx-auto"
        @submit.prevent="onSubmit">
        <v-labeled-input
          v-model="updateUserData.name"
          autofocus
          label="Name"
          placeholder="Enter name"
          :disabled="updateUserIsLoading"
          :error-message="updateUserValidationErrors?.name?.[0]" />
        <v-labeled-input
          v-model="updateUserData.email"
          label="Email Address"
          placeholder="Enter email address"
          required
          type="email"
          :disabled="updateUserIsLoading"
          :error-message="updateUserValidationErrors?.email?.[0]" />
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
          message: 'Contact information updated',
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
