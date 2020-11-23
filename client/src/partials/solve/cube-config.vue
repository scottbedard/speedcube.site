<template>
  <div class="gap-6 grid xs:grid-cols-2 md:grid-cols-3">
    <div class="xs:col-span-2 md:col-span-3">
      <v-label label="Colors">
        <div class="gap-6 flex flex-wrap">
          <v-color-picker
            v-for="n in 6"
            value="#ffffff"
            :key="n" />
        </div>
      </v-label>
    </div>

    <v-label label="Camera Angle">
      <v-range-input
        :max="1"
        :min="0"
        :step="0.01" />
    </v-label>

    <v-label label="Camera Distance">
      <v-range-input
        :max="1"
        :min="0"
        :step="0.01" />
    </v-label>

    <v-label label="Turn Duration">
      <v-range-input
        :max="1"
        :min="0"
        :step="0.01" />
    </v-label>

    <v-label label="Sticker Spacing">
      <v-range-input
        :max="1"
        :min="0"
        :step="0.01" />
    </v-label>

    <v-label label="Sticker Elevation">
      <v-range-input
        :max="1"
        :min="0"
        :step="0.01" />
    </v-label>

    <v-label label="Sticker Radius">
      <v-range-input
        :max="1"
        :min="0"
        :step="0.01" />
    </v-label>

    <v-label label="Inner Brightness">
      <v-range-input
        :max="1"
        :min="0"
        :step="0.01" />
    </v-label>
  </div>
</template>

<script lang="ts">
import { CubeConfig } from '@/types/puzzle';
import { defineComponent, PropType } from 'vue';
import { PuzzleConfig } from '@/types/models/puzzle-config';
import VColorPicker from '@/components/color-picker.vue';
import VLabel from '@/components/label.vue';
import VRangeInput from '@/components/range-input.vue';

export default defineComponent({
  setup() {
    // ..
  },
  components: {
    VColorPicker,
    VLabel,
    VRangeInput,
  },
  props: {
    puzzleConfig: {
      required: true,
      type: Object as PropType<Partial<PuzzleConfig<CubeConfig>>>,
    },
  },
});
</script>
