<template>
  <div />
</template>

<script>
import { logoutCurrentUser } from '@/app/store/user/actions';

export default {
  created() {
    logoutCurrentUser().then(() => {
      this.$router.replace({ name: 'home' });
    });
  },
};
</script>
