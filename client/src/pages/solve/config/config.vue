<template>
  <form
    class="max-w-5xl w-full"
    @submit.prevent="onSubmit">

    <!-- fields -->
    <div class="gap-6 grid xs:grid-cols-2 md:grid-cols-3">
      <div
        v-for="field in fields"
        :class="{ 'xs:col-span-2 md:col-span-3': field.fullWidth }"
        :key="field.key">
        <v-label :label="field.label">
          <!-- colors -->
          <div v-if="field.type === 'colors'" class="gap-6 flex flex-wrap">
            <v-color-picker
              v-for="n in field.options.quantity"
              v-model="pendingConfig[field.key][n - 1]"
              value="#ffffff"
              :key="n" />
          </div>

          <!-- number -->
          <v-range-input
            v-else-if="field.type === 'number'"
            v-model="pendingConfig[field.key]"
            :max="field.options.max"
            :min="field.options.min"
            :step="field.options.step" />
        </v-label>
      </div>
    </div>

    <!-- actions -->
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
import { cubeFields, dodecaminxEvenFields, dodecaminxOddFields } from './fields';
import { dodecaminxSize, getPuzzleId, isCube, isDodecaminx } from '@/app/utils/puzzle';
import { onUnmounted, ref } from 'vue';
import { pendingConfig } from '../state';
import { usePuzzleName } from '../behaviors';
import VButton from '@/components/button.vue';
import VColorPicker from '@/components/color-picker.vue';
import VLabel from '@/components/label.vue';
import VRangeInput from '@/components/range-input.vue';

export default defineComponent({
  setup() {
    const isLoading = ref(false);
    const puzzleName = usePuzzleName();

    // config fields
    const fields = computed(() => {
      if (isCube(puzzleName.value)) {
        return cubeFields;
      }

      if (isDodecaminx(puzzleName.value)) {
        return dodecaminxSize(puzzleName.value) % 2
          ? dodecaminxEvenFields
          : dodecaminxOddFields;
      }

      return [];
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
        data: pendingConfig.value || {},
      }).then(() => {
        isLoading.value = false;
      });
    }

    return {
      fields,
      isLoading,
      onSubmit,
      pendingConfig,
    };
  },
  components: {
    VButton,
    VColorPicker,
    VLabel,
    VRangeInput,
  },
});
</script>
