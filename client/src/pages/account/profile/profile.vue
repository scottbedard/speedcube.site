<template>
  <div class="grid gap-6">
    <v-avatar-form />
    <v-contact-info-form />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VAvatarForm from '@/partials/account/avatar-form.vue';
import VContactInfoForm from '@/partials/account/contact-info-form.vue';

export default defineComponent({
  components: {
    VAvatarForm,
    VContactInfoForm,
  },
});
</script>
