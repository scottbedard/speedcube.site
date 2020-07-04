<template>
  <div>
    <div class="max-w-md mx-auto">
      <!-- <button
        class="bg-gray-300 mr-4 mb-4 p-2 rounded hover:bg-gray-400"
        @click="add(1)">
        +
      </button><button
        class="bg-gray-300 mr-4 mb-4 p-2 rounded hover:bg-gray-400"
        @click="add(-1)">
        -
      </button> -->

      <Scene
        :camera-angle="cameraAngle"
        :camera-distance="cameraDistance"
        :children="children">
        <div class="pb-full" />
      </Scene>

      <div class="mt-4">
        <label class="block mb-4">
          <div>Camera Angle: {{ cameraAngle }}</div>
          <input v-model.number="cameraAngle" min="0" max="90" type="range" />
        </label>
        <label class="block mb-4">
          <div>Camera Distance: {{ cameraDistance }}</div>
          <input v-model.number="cameraDistance" min="0" max="10" step="0.01" type="range" />
        </label>
        <label class="block mb-4">
          <div>Position: <span class="font-mono">{{ position }}</span></div>
          <div class="flex">
            <input v-model.number="position.x" min="-10" max="10" step="0.01" type="range" />
            <input v-model.number="position.y" min="-10" max="10" step="0.01" type="range" />
            <input v-model.number="position.z" min="-10" max="10" step="0.01" type="range" />
          </div>
        </label>
        <label class="block mb-4">
          <div>Hidden: <span class="font-mono">{{ hidden }}</span></div>
          <div class="flex">
            <input v-model="hidden" type="checkbox" />
          </div>
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { ref } from '@vue/composition-api';
import Scene from '@/components/three/Scene.vue';
import { useAmbientLight } from '@/app/three/lights/useAmbientLight';
import { useAxesHelper } from '@/app/three/utils/useAxesHelper';
import { useGroup } from '@/app/three/utils/useGroup';
import { useCubePuzzle } from '@/app/three/puzzles/useCubePuzzle';
import { Cube } from '@bedard/twister';

export default {
  setup() {
    const cameraAngle = ref(35);
    const cameraDistance = ref(2);
    const debug = true;
    const position = ref({ x: 0, y: 0, z: 0 });
    const hidden = ref(false);

    const model = new Cube({
      size: 5,
    });

    const children = useGroup({}, [
      useAxesHelper(),
      useAmbientLight(),
      useCubePuzzle({
        hidden,
        model,
        position,
      }),
    ]);

    return {
      cameraAngle,
      cameraDistance,
      children,
      hidden,
      position,
    };
  },
  components: {
    Scene,
  },
};
</script>
