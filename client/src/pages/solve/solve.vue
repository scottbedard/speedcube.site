<template>
  <v-puzzle
    v-if="model"
    class="max-w-md mb-16 mx-auto"
    :config="config"
    :model="model" />
  
  <div class="flex justify-center">
    <router-view />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { pendingPuzzleConfig, resetSolveState } from './state';
import { usePuzzleName, useModel } from './behaviors';
import { useRouter } from 'vue-router';
import { userPuzzleConfig } from '@/app/store/user/getters';
import VPuzzle from '@/components/puzzle/puzzle.vue';

export default defineComponent({
  setup() {
    const puzzleName = usePuzzleName();
    const model = useModel({ puzzleName });

    // redirect to 3x3 if puzzle is unknown
    if (!model.value) {
      const router = useRouter();

      router.replace({
        name: 'solve',
        params: { puzzle: '3x3' },
      });
    }

    resetSolveState();

    // current puzzle configuration
    const config = computed(() => {
      return pendingPuzzleConfig.value
        ? pendingPuzzleConfig.value
        : userPuzzleConfig.value(puzzleName.value);
    });

    return {
      config,
      model,
    };
  },
  components: {
    VPuzzle,
  },
});
</script>
