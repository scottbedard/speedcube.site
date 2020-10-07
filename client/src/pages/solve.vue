<template>
  <h1 class="font-bold text-2xl">Hello from the solve page</h1>

  <p class="mb-12">For now, this will serve as a sandbox for our 3D composition functions.</p>
  
  <div class="max-w-sm mb-12 mx-auto">
    <v-puzzle
      class="max-w-sm"
      :camera-angle="cameraAngle"
      :camera-distance="cameraDistance" />
  </div>
  
  <div class="max-w-sm mx-auto">
    <div>Camera distance:</div>
    <v-range-input
      v-model="cameraDistance"
      :min="0"
      :max="1000" />
    
    <div>Camera angle:</div>
    <v-range-input
      v-model="cameraAngle"
      :min="0"
      :max="90" />

    <pre>{{ $data }}</pre>
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
      cameraDistance: 100,
    };
  },
  components: {
    VPuzzle,
    VRangeInput,
  },
});
</script>
