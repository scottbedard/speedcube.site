<template>
  <h1 class="font-bold text-2xl">Signout out...</h1>
</template>

<script>
import { defineComponent } from 'vue';
import { logoutCurrentUser } from '@/app/store/user/actions';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();

    logoutCurrentUser().then(() => {
      router.replace({ name: 'home' });
    });
  },
});
</script>
