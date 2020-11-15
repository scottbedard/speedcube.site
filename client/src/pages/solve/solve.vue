<template>
  <h1 class="font-bold text-2xl">Hello from the solve page</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();

    if (!route.params.id) {
      router.replace({
        name: 'solve',
        params: {
          id: '3x3',
        },
      });
    }
  },
});
</script>
