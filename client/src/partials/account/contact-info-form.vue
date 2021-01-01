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
          label="Name"
          placeholder="Enter name" />
        <v-labeled-input
          label="Email Address"
          placeholder="Enter email address"
          required
          type="email" />
        <div class="flex justify-end">
          <v-button type="submit">Save</v-button>
        </div>
      </form>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VButton from '@/components/button.vue';
import VCard from '@/components/card.vue';
import VCardHeader from '@/components/card-header.vue';
import VLabeledInput from '@/components/labeled-input.vue';

export default defineComponent({
  setup() {
    const onSubmit = () => {
      console.log('submit');
    };

    return {
      onSubmit,
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
