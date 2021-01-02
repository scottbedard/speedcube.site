<template>
  <div>
    <v-password-form />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VPasswordForm from '@/partials/account/password-form.vue';

export default defineComponent({
  components: {
    VPasswordForm,
  },
});
</script>