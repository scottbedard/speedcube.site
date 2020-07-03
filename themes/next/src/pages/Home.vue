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

      <Scene :children="children">
        <div class="pb-full" />
      </Scene>

      <div class="mt-4">
        <!-- <label class="block mb-4">
          <div>Camera Angle: {{ cameraAngle }}</div>
          <input v-model.number="cameraAngle" min="0" max="90" type="range" />
        </label>
        <label class="block mb-4">
          <div>Camera Distance: {{ cameraDistance }}</div>
          <input v-model.number="cameraDistance" min="0" max="1000" type="range" />
        </label> -->
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
    const children = useGroup({
      name: 'foo',
      position: {
        // x: -50,
      },
    }, [
      useAxesHelper(),
      useAmbientLight(),
      useBox(),
    ]);

    console.log({ children });

    return {
      children,
    };
  },
  components: {
    Scene,
  },
};
</script>
