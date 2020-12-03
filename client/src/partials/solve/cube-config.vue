<template>
  <div class="gap-6 grid xs:grid-cols-2 md:grid-cols-3">
    <div class="xs:col-span-2 md:col-span-3">
      <v-label label="Colors">
        <div class="gap-6 flex flex-wrap">
          <v-color-picker
            v-for="n in 6"
            v-model="pendingConfig.colors[n - 1]"
            value="#ffffff"
            :key="n" />
        </div>
      </v-label>
    </div>

    <v-label label="Camera Angle">
      <v-range-input
        v-model="pendingConfig.cameraAngle"
        :max="90"
        :min="0"
        :step="0.01" />
    </v-label>

    <v-label label="Camera Distance">
      <v-range-input
        v-model="pendingConfig.cameraDistance"
        :max="5"
        :min="0"
        :step="0.01" />
    </v-label>

    <v-label label="Turn Duration">
      <v-range-input
        v-model="pendingConfig.turnDuration"
        :max="1000"
        :min="20"
        :step="1" />
    </v-label>

    <v-label label="Sticker Spacing">
      <v-range-input
        v-model="pendingConfig.stickerSpacing"
        :max="1"
        :min="0"
        :step="0.01" />
    </v-label>

    <v-label label="Sticker Elevation">
      <v-range-input
        v-model="pendingConfig.stickerElevation"
        :max="1"
        :min="0"
        :step="0.01" />
    </v-label>

    <v-label label="Sticker Radius">
      <v-range-input
        v-model="pendingConfig.stickerRadius"
        :max="1"
        :min="0"
        :step="0.01" />
    </v-label>

    <v-label label="Inner Brightness">
      <v-range-input
        v-model="pendingConfig.innerBrightness"
        :max="1"
        :min="0"
        :step="0.01" />
    </v-label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { pendingConfig } from '@/pages/solve/state';
import VColorPicker from '@/components/color-picker.vue';
import VLabel from '@/components/label.vue';
import VRangeInput from '@/components/range-input.vue';

export default defineComponent({
  setup() {
    return {
      pendingConfig,
    };
  },
  components: {
    VColorPicker,
    VLabel,
    VRangeInput,
  },
});
</script>
