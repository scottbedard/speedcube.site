<template>
  <h1 class="font-bold mb-2 text-center text-2xl">3D Sandbox</h1>
  <p class="mb-12 text-center ">Use this route as a workspace for generating 3D content</p>

  <v-scene
    class="max-w-2xl mb-12 mx-auto"
    square
    :camera-angle="cameraAngle"
    :camera-distance="cameraDistance">
    <v-axes-helper />
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VAxesHelper from '@/components/three/utils/axes-helper.vue';
import VScene from '@/components/three/scene.vue';
import VRangeInput from '@/components/range-input.vue';

export default defineComponent({
  data() {
    return {
      cameraAngle: 25,
      cameraDistance: 3,
    };
  },
  components: {
    VAxesHelper,
    VRangeInput,
    VScene,
  },
});
</script>