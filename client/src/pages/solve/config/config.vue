<template>
  <form
    class="max-w-5xl w-full"
    @submit.prevent="onSubmit">
    <component :is="configComponent" />
    <div class="flex items-center justify-end mt-6">
      <router-link
        class="flex items-center mr-12"
        :to="{ name: 'solve' }">
        Cancel
      </router-link>
      <v-button type="submit">Save</v-button>
    </div>
  </form>
</template>

<script lang="ts">
import { cloneDeep } from 'lodash-es';
import { computed, defineComponent } from 'vue';
import { isCube, isDodecaminx } from '@/app/utils/puzzle';
import { onUnmounted } from 'vue';
import { pendingPuzzleConfig } from '../state';
import { usePuzzleName } from '../behaviors';
import { userPuzzleConfig } from '@/app/store/user/getters';
import VButton from '@/components/button.vue';
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

    const onSubmit = () => {
      console.log('submit');
    }

    return {
      configComponent,
      onSubmit,
      pendingPuzzleConfig,
    };
  },
  components: {
    VButton,
  },
});
</script>
