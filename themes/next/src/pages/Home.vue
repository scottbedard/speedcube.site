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
          <div>Position: <span class="font-mono">{{ { height, width, depth } }}</span></div>
          <div class="flex">
            <input v-model.number="position.x" min="-10" max="10" step="0.01" type="range" />
            <input v-model.number="position.y" min="-10" max="10" step="0.01" type="range" />
            <input v-model.number="position.z" min="-10" max="10" step="0.01" type="range" />
          </div>
        </label>
        <label class="block mb-4">
          <div>Box: <span class="font-mono">{{ { height, width, depth } }}</span></div>
          <div class="flex">
            <input v-model.number="height" min="0" max="10" step="0.01" type="range" />
            <input v-model.number="width" min="0" max="10" step="0.01" type="range" />
            <input v-model.number="depth" min="0" max="10" step="0.01" type="range" />
          </div>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { ref } from '@vue/composition-api';
import Scene from '@/components/three/Scene.vue';
import { useAxesHelper } from '@/app/three';
import { Object3D } from 'three';
import { useAmbientLight } from '@/app/three/lights';
import { useBox } from '@/app/three/geometries';
import { useGroup } from '@/app/three/useGroup';

export default {
  setup() {
    const cameraAngle = ref(50);
    const cameraDistance = ref(5);
    const position = ref({ x: 0, y: 0, z: 0 });
    const height = ref(1);
    const depth = ref(1);
    const width = ref(1);

    const children = useGroup({
      name: 'foo',
    }, [
      useAxesHelper(),
      useAmbientLight(),
      useBox({
        depth,
        height,
        position,
        width,
      }),
    ]);

    return {
      cameraAngle,
      cameraDistance,
      children,
      position,
      height,
      width,
      depth,
    };
  },
  components: {
    Scene,
  },
};
</script>
