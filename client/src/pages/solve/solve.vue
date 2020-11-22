<template>
  <v-puzzle
    v-if="model"
    class="max-w-md mb-16 mx-auto"
    :model="model" />
  
  <div class="flex justify-center">
    <router-view />
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent } from 'vue';
import { useModel } from './model';
import { useRoute, useRouter } from 'vue-router';
// import VNavigation from '@/partials/solve/navigation.vue';
import VPuzzle from '@/components/puzzle/puzzle.vue';

export default defineComponent({
  setup() {
    const route = useRoute();
    const model = useModel({ route });

    // redirect to 3x3 if puzzle is unknown
    if (!model.value) {
      const router = useRouter();

      router.replace({
        name: 'solve',
        params: { puzzle: '3x3' },
      });
    }

    return {
      model,
    };
  },
  components: {
    // VNavigation,
    VPuzzle,
  },
});
</script>
