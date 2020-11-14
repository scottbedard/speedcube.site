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
          <div>Size</div>
          <v-range-input v-model="size" :max="5" :min="2" :step="1" />
        </div>
        <div :class="{ 'opacity-50 pointer-events-none': !showMiddleConfig }">
          <div>Middle size</div>
          <v-range-input v-model="config.middleSize" :max="1" :min="0" :step="0.01" />
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
import { computed, defineComponent, ref } from 'vue';
import { Dodecaminx } from '@bedard/twister';
import { isOdd } from '@/app/utils/math';
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
        middleSize: 0,
        stickerElevation: 0.05,
        stickerRadius: 0.1,
        stickerSpacing: 0.1,
      },
      currentTurn: 'R',
      turnProgress: 0.3,
    };
  },
  setup() {
    const size = ref(3);
    const showMiddleConfig = computed(() => isOdd(size.value));
    const model = computed(() => new Dodecaminx({ size: size.value }));

    return {
      model,
      showMiddleConfig,
      size,
    }
  },
  components: {
    VInput,
    VPuzzle,
    VRangeInput,
  },
});
</script>
