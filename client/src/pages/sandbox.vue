<template>
  <h1 class="font-bold mb-2 text-center text-2xl">3D Sandbox</h1>
  <p class="mb-12 text-center ">Use this route as a workspace for generating 3D content</p>

  <v-scene
    class="max-w-lg mb-12 mx-auto"
    square
    :camera-angle="cameraAngle"
    :camera-distance="cameraDistance">
    <!-- lights -->
    <v-ambient-light color="#fff" :intensity="1" />
    <!-- <v-point-light :intensity="0.5" :position="{ x: -5, y: 5 }" />
    <v-point-light :intensity="0.5" :position="{ x: 0, y: 5 }" />
    <v-point-light :intensity="0.5" :position="{ x: 5, y: 5 }" />
    <v-point-light :intensity="0.2" :position="{ x: 5, y: -5 }" /> -->
    
    <!-- axes helper -->
    <v-axes-helper size="2" />

    <!-- dodecaminx -->
    <v-dodecaminx
      :config="{
        innerBrightness,
        middleSize,
        stickerElevation,
        stickerRadius,
        stickerSpacing,
      }" />
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
      <div>Sticker elevation</div>
      <v-range-input v-model="stickerElevation" :max="1" :min="0" :step="0.0001" />
    </div>
    <div class="col-span-12 sm:col-span-6">
      <div>Sticker spacing</div>
      <v-range-input v-model="stickerSpacing" :max="1" :min="0" :step="0.01" />
    </div>
    <div class="col-span-12 sm:col-span-6">
      <div>Sticker radius</div>
      <v-range-input v-model="stickerRadius" :max="1" :min="0" :step="0.01" />
    </div>
    <div class="col-span-12 sm:col-span-6">
      <div>Middle size</div>
      <v-range-input v-model="middleSize" :max="1" :min="0" :step="0.01" />
    </div>
    <div class="col-span-12 sm:col-span-6">
      <div>Inner brightness</div>
      <v-range-input v-model="innerBrightness" :max="1" :min="0" :step="0.01" />
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { createShape } from '@/app/three/utils/shape';
import { defineComponent } from 'vue';
import VAmbientLight from '@/components/three/lights/ambient-light.vue';
import VAxesHelper from '@/components/three/utils/axes-helper.vue';
import VPointLight from '@/components/three/lights/point-light.vue';
import VRangeInput from '@/components/range-input.vue';
import VScene from '@/components/three/scene.vue';
import VDodecaminx from '@/components/puzzle/dodecaminx/dodecaminx.vue';

export default defineComponent({
  data() {
    return {
      cameraAngle: 40,
      cameraDistance: 2.5,
      innerBrightness: 0.5,
      middleSize: 0,
      stickerElevation: 0.05,
      stickerRadius: 0.1,
      stickerSpacing: 0.1,
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