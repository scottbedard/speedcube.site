<template>
  <div class="max-w-5xl w-full">
    <component :is="configComponent" />
  </div>
</template>

<script lang="ts">
import { cloneDeep } from 'lodash-es';
import { computed, defineComponent } from 'vue';
import { isCube, isDodecaminx } from '@/app/utils/puzzle';
import { onUnmounted } from 'vue';
import { pendingPuzzleConfig } from '../state';
import { usePuzzleName } from '../behaviors';
import { userPuzzleConfig } from '@/app/store/user/getters';
import VCubeConfig from '@/partials/solve/cube-config.vue';
import VDodecaminxConfig from '@/partials/solve/dodecaminx-config.vue';

export default defineComponent({
  setup() {
    const puzzleName = usePuzzleName();

    const configComponent = computed(() => {
      if (isCube(puzzleName.value)) return VCubeConfig;
      if (isDodecaminx(puzzleName.value)) return VDodecaminxConfig;
    });

    // set pending config to equal the current config
    pendingPuzzleConfig.value = cloneDeep(userPuzzleConfig.value(puzzleName.value));

    // flush pending config when the editor is closed
    onUnmounted(() => {
      pendingPuzzleConfig.value = null;
    });

    return {
      configComponent,
      pendingPuzzleConfig,
    };
  },
});
</script>
