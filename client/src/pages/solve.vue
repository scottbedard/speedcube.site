<template>
  <h1 class="font-bold text-2xl">Hello from the solve page</h1>

  <p class="mb-12">For now, this will serve as a sandbox for our 3D composition functions.</p>
  
  <div class="max-w-sm mb-12 mx-auto">
    <v-puzzle
      class="max-w-sm"
      name="cube"
      :camera-angle="cameraAngle"
      :camera-distance="cameraDistance"
      :options="options"
      :hmm="options.stickerRadius" />
  </div>
  
  <div class="max-w-sm mx-auto">
    <div>Camera distance:</div>
    <v-range-input
      v-model="cameraDistance"
      :min="1"
      :max="4"
      :step="0.001" />
    
    <div class="mt-2">Camera angle:</div>
    <v-range-input
      v-model="cameraAngle"
      :min="0"
      :max="90" />

    <div class="mt-2">Sticker spacing:</div>
    <v-range-input
      v-model="options.stickerSpacing"
      :min="0"
      :max="1"
      :step="0.01" />

    <div class="mt-2">Sticker elevation:</div>
    <v-range-input
      v-model="options.stickerElevation"
      :min="0"
      :max="1"
      :step="0.01" />

    <div class="mt-2">Sticker radius:</div>
    <v-range-input
      v-model="options.stickerRadius"
      :min="0"
      :max="1"
      :step="0.01" />

    <div class="mt-2">Inner brightness:</div>
    <v-range-input
      v-model="options.innerBrightness"
      :min="0"
      :max="1"
      :step="0.01" />

    <pre class="mt-2">{{ $data }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VPuzzle from '@/components/puzzle/puzzle.vue';
import VRangeInput from '@/components/range-input.vue';

export default defineComponent({
  data() {
    return {
      cameraAngle: 20,
      cameraDistance: 2.5,
      options: {
        colors: ['ff0000', '00ff00', '0000ff'],
        innerBrightness: 1,
        stickerElevation: 0,
        stickerRadius: 0,
        stickerSpacing: 0,
        turnDuration: 200,
      },
    };
  },
  components: {
    VPuzzle,
    VRangeInput,
  },
});
</script>
