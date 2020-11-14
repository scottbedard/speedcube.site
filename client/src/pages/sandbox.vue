<template>
  <h1 class="font-bold mb-2 text-center text-2xl">3D Sandbox</h1>
  <p class="mb-12 text-center ">Use this route as a workspace for generating 3D content</p>
  
  <v-scene
    class="max-w-xl mb-12 mx-auto"
    square
    :camera-angle="cameraAngle"
    :camera-distance="cameraDistance">
    <v-ambient-light color="#fff" :intensity="1" />
    <v-axes-helper size="2" />
    <v-sphere-geometry color="#f00" wireframe :radius="1" />
  </v-scene>

  <div class="gap-6 grid max-w-xl mx-auto sm:grid-cols-2">
    <div>
      <div>Camera angle</div>
      <v-range-input v-model="cameraAngle" :min="0" :max="90" :step="0.01" />
    </div>
    <div>
      <div>Camera distance</div>
      <v-range-input v-model="cameraDistance" :min="0" :max="5" :step="0.01" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import VAmbientLight from '@/components/three/lights/ambient-light.vue';
import VAxesHelper from '@/components/three/utils/axes-helper.vue';
import VRangeInput from '@/components/range-input.vue';
import VScene from '@/components/three/scene.vue';
import VSphereGeometry from '@/components/three/geometries/sphere-geometry.vue';

export default defineComponent({
  setup() {
    const cameraAngle = ref(45);
    const cameraDistance = ref(3);

    return {
      cameraAngle,
      cameraDistance,
    };
  },
  components: {
    VAmbientLight,
    VAxesHelper,
    VRangeInput,
    VScene,
    VSphereGeometry,
  },
});
</script>
