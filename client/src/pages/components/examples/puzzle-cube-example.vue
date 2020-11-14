<template>
  <div class="gap-6 grid md:grid-cols-2">
    <v-puzzle
      class="max-w-md mb-6"
      :config="config"
      :current-turn="currentTurn"
      :model="model"
      :turn-progress="turnProgress" />

    <div>
      <div class="gap-6 grid max-w-md sm:grid-cols-2">
        <div>
          <div>Current turn</div>
          <v-input v-model="currentTurn" placeholder="Enter a turn" />
        </div>
        <div>
          <div>Turn progress</div>
          <v-range-input v-model="turnProgress" :max="1" :min="0" :step="0.01" />
        </div>
        <div>
          <div>Camera angle</div>
          <v-range-input v-model="config.cameraAngle" :max="90" :min="0" :step="0.01" />
        </div>
        <div>
          <div>Camera distance</div>
          <v-range-input v-model="config.cameraDistance" :max="5" :min="0" :step="0.01" />
        </div>
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
  </div>
</template>

<script lang="ts">
import { Cube } from '@bedard/twister';
import { defineComponent } from 'vue';
import VInput from '@/components/input.vue';
import VPuzzle from '@/components/puzzle/puzzle.vue';
import VRangeInput from '@/components/range-input.vue';

export default defineComponent({
  data() {
    return {
      config: {
        cameraAngle: 45,
        cameraDistance: 3,
        innerBrightness: 0.9,
        stickerElevation: 0.25,
        stickerRadius: 0.25,
        stickerSpacing: 0.25,
      },
      currentTurn: 'U',
      model: new Cube({ size: 3 }),
      turnProgress: 0.3,
    };
  },
  components: {
    VInput,
    VPuzzle,
    VRangeInput,
  },
});
</script>
