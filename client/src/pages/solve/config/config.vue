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
      <v-button type="submit" :loading="isLoading">Save</v-button>
    </div>
  </form>
</template>

<script lang="ts">
import { cloneDeep } from 'lodash-es';
import { computed, defineComponent } from 'vue';
import { config } from '@/app/store/user/getters';
import { createConfig } from '@/app/store/user/actions';
import { getPuzzleId, isCube, isDodecaminx } from '@/app/utils/puzzle';
import { onUnmounted, ref } from 'vue';
import { pendingConfig } from '../state';
import { usePuzzleName } from '../behaviors';
import VButton from '@/components/button.vue';
import VCubeConfig from '@/partials/solve/cube-config.vue';
import VDodecaminxConfig from '@/partials/solve/dodecaminx-config.vue';

export default defineComponent({
  setup() {
    const isLoading = ref(false);
    const puzzleName = usePuzzleName();

    const configComponent = computed(() => {
      if (isCube(puzzleName.value)) return VCubeConfig;
      if (isDodecaminx(puzzleName.value)) return VDodecaminxConfig;
    });

    // set pending config to equal the current config
    pendingConfig.value = cloneDeep(config.value(puzzleName.value));

    // flush pending config when the editor is closed
    onUnmounted(() => {
      pendingConfig.value = null;
    });

    // create the config and refresh the user
    const onSubmit = () => {
      isLoading.value = true;

      createConfig({
        puzzleId: getPuzzleId(puzzleName.value),
        json: pendingConfig.value || {},
      }).then(() => {
        isLoading.value = false;
      });
    }

    return {
      configComponent,
      isLoading,
      onSubmit,
      pendingConfig,
    };
  },
  components: {
    VButton,
  },
});
</script>
