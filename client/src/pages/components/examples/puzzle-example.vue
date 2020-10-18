<template>
  <v-puzzle
    class="max-w-md mb-6"
    :config="config"
    :model="model" />

  <div class="gap-6 grid max-w-md">
    <div>
      <div>Camera angle</div>
      <v-range-input v-model="config.cameraAngle" :max="90" :min="0" :step="0.01" />
    </div>
    <div>
      <div>Camera distance</div>
      <v-range-input v-model="config.cameraDistance" :max="5" :min="0" :step="0.01" />
    </div>
    <div class="gap-6 grid sm:grid-cols-2">
      <div>
        <div>Sticker elevation</div>
        <v-range-input v-model="config.stickerElevation" :max="1" :min="0" :step="0.01" />
      </div>
      <div>
        <div>Sticker spacing</div>
        <v-range-input v-model="config.stickerSpacing" :max="1" :min="0" :step="0.01" />
      </div>
      <div>
        <div>Sticker radius</div>
        <v-range-input v-model="config.stickerRadius" :max="1" :min="0" :step="0.01" />
      </div>
      <div>
        <div>Inner brightness</div>
        <v-range-input v-model="config.innerBrightness" :max="1" :min="0" :step="0.01" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Cube } from '@bedard/twister';
import { defineComponent } from 'vue';
import VPuzzle from '@/components/puzzle/puzzle.vue';
import VRangeInput from '@/components/range-input.vue';

export default defineComponent({
  data() {
    return {
      config: {
        cameraAngle: 25,
        cameraDistance: 3,
        innerBrightness: 0,
        stickerElevation: 0,
        stickerRadius: 0.5,
        stickerSpacing: 0,
      },
      model: new Cube({ size: 3 }),
    };
  },
  components: {
    VPuzzle,
    VRangeInput,
  },
});
</script>
