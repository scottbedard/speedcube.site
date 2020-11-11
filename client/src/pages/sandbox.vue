<template>
  <h1 class="font-bold mb-2 text-center text-2xl">3D Sandbox</h1>
  <p class="mb-12 text-center ">Use this route as a workspace for generating 3D content</p>

  <v-scene
    class="max-w-2xl mb-12 mx-auto"
    square
    :camera-angle="cameraAngle"
    :camera-distance="cameraDistance">
    <!-- lights -->
    <v-ambient-light color="#fff" :intensity="0.7" />
    <v-point-light :intensity="0.5" :position="{ x: -5, y: 5 }" />
    <v-point-light :intensity="0.5" :position="{ x: 0, y: 5 }" />
    <v-point-light :intensity="0.5" :position="{ x: 5, y: 5 }" />
    <v-point-light :intensity="0.2" :position="{ x: 5, y: -5 }" />
    
    <!-- axes helper -->
    <v-axes-helper size="2" />

    <!-- dodecaminx -->
    <v-dodecaminx
      :config="{
        middleSize,
        stickerSpacing,
      }"
      :radius="radius" />
  </v-scene>

  <div class="gap-6 grid grid-cols-12 max-w-2xl mx-auto">
    <div class="col-span-12 sm:col-span-6">
      <div>Camera angle</div>
      <v-range-input v-model="cameraAngle" :max="90" :min="0" :step="0.01" />
    </div>
    <div class="col-span-12 sm:col-span-6">
      <div>Camera distance</div>
      <v-range-input v-model="cameraDistance" :max="5" :min="0" :step="0.01" />
    </div>
    <div class="col-span-12 sm:col-span-6">
      <div>Radius</div>
      <v-range-input v-model="radius" :max="5" :min="0" :step="0.01" />
    </div>
    <div class="col-span-12 sm:col-span-6">
      <div>Middle size</div>
      <v-range-input v-model="middleSize" :max="1" :min="0" :step="0.01" />
    </div>
    <div class="col-span-12 sm:col-span-6">
      <div>Sticker spacing</div>
      <v-range-input v-model="stickerSpacing" :max="1" :min="0" :step="0.01" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VAmbientLight from '@/components/three/lights/ambient-light.vue';
import VAxesHelper from '@/components/three/utils/axes-helper.vue';
import VPointLight from '@/components/three/lights/point-light.vue';
import VRangeInput from '@/components/range-input.vue';
import VScene from '@/components/three/scene.vue';

import VDodecaminx from '@/components/puzzle/dodecaminx/dodecaminx.vue';

export default defineComponent({
  setup() {
    // ...
  },
  data() {
    return {
      cameraAngle: 90,
      cameraDistance: 2,
      middleSize: 0,
      radius: 1,
      stickerSpacing: 0,
    };
  },
  components: {
    VAmbientLight,
    VAxesHelper,
    VDodecaminx,
    VPointLight,
    VRangeInput,
    VScene,
  },
});
</script>