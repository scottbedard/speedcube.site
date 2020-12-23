<template>
  <pre class="text-xs">{{ { currentKeyspace } }}</pre>
  <v-keyboard
    :current-keyspace="currentKeyspace"
    :keyboard-config="activeKeyboardConfig"
    @change-keyspace="changeKeyspace"
    @turn="queueTurn" />

  <v-puzzle
    v-if="model"
    class="max-w-md mb-6 mx-auto"
    :border="border"
    :config="activeConfig"
    :model="model" />
  
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
import { usePuzzleName, useModel } from './behaviors';
import { useRoute, useRouter } from 'vue-router';
import VKeyboard from '@/components/keyboard.vue';
import VPuzzle from '@/components/puzzle/puzzle.vue';

export default defineComponent({
  setup() {
    const puzzleName = usePuzzleName();
    const route = useRoute();
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
    const activeConfig = computed(() => {
      return pendingConfig.value || config.value(puzzleName.value);
    });

    // current keyboard configuration
    const activeKeyboardConfig = computed(() => {
      return pendingKeyboardConfig.value || keyboardConfig.value(puzzleName.value)
    });

    // show puzzle border when config editor is open
    const border = computed(() => route.name === 'solve-config');

    // change the user's keyspace
    const changeKeyspace = (keyspace: string) => {
      currentKeyspace.value = keyspace;
    }

    // queue a turn for execution
    const queueTurn = (turn: string) => {
      console.log('queing', turn);
    }

    return {
      activeConfig,
      activeKeyboardConfig,
      changeKeyspace,
      currentKeyspace,
      border,
      model,
      queueTurn,
    };
  },
  components: {
    VKeyboard,
    VPuzzle,
  },
});
</script>
