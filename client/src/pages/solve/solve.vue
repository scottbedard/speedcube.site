<template>
  <!-- <pre class="fixed top-24 left-6 text-xs">{{ { currentTurn, turnProgress, isTurning } }}</pre> -->
  <v-keyboard
    :current-keyspace="currentKeyspace"
    :keyboard-config="currentKeyboardConfig"
    @change-keyspace="changeKeyspace"
    @turn="queueTurn" />

  <v-puzzle
    v-if="model"
    class="max-w-md mb-6 mx-auto"
    :border="route.name === 'solve-config'"
    :current-turn="currentTurn?.turn"
    :config="currentConfig"
    :model="model"
    :turn-progress="turnProgress" />
  
  <div class="flex justify-center">
    <div class="max-w-6xl mx-auto w-full">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { config, keyboardConfig } from '@/app/store/user/getters';
import { currentKeyspace, pendingConfig, pendingKeyboardConfig, resetSolveState } from './state';
import { usePuzzleManager } from '@/app/behaviors/puzzle-manager';
import { usePuzzleName, useModel } from './behaviors';
import { useRoute, useRouter } from 'vue-router';
import VKeyboard from '@/components/keyboard.vue';
import VPuzzle from '@/components/puzzle/puzzle.vue';

export default defineComponent({
  setup() {
    const puzzleName = usePuzzleName();
    const route = useRoute();
    const model = useModel({ puzzleName });

    // reset page state
    resetSolveState();

    // redirect to 3x3 if puzzle is unknown
    if (!model.value) {
      const router = useRouter();

      router.replace({
        name: 'solve',
        params: { puzzle: '3x3' },
      });

      return {}
    }

    // current puzzle configuration
    const currentConfig = computed(() => {
      return pendingConfig.value || config.value(puzzleName.value);
    });

    // current keyboard configuration
    const currentKeyboardConfig = computed(() => {
      return pendingKeyboardConfig.value || keyboardConfig.value(puzzleName.value)
    });

    // current turn duration
    const currentTurnDuration = computed<number>(() => {
      return typeof currentConfig.value?.duration === 'number'
        ? currentConfig.value.duration
        : 100;
    });

    // puzzle manager
    const {
      currentTurn,
      isTurning,
      queueTurn,
      turnProgress,
    } = usePuzzleManager({
      duration: currentTurnDuration,
      puzzle: model.value,
    });

    // change the user's keyspace
    const changeKeyspace = (keyspace: string) => {
      currentKeyspace.value = keyspace;
    }

    return {
      changeKeyspace,
      currentConfig,
      currentKeyboardConfig,
      currentKeyspace,
      currentTurn,
      isTurning,
      model,
      queueTurn,
      route,
      turnProgress,
    };
  },
  components: {
    VKeyboard,
    VPuzzle,
  },
});
</script>
