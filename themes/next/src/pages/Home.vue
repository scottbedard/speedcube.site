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
          <div>Position2: <span class="font-mono">{{ { position: position2 } }}</span></div>
          <div class="flex">
            <input v-model.number="position2.x" min="-10" max="10" step="0.01" type="range" />
            <input v-model.number="position2.y" min="-10" max="10" step="0.01" type="range" />
            <input v-model.number="position2.z" min="-10" max="10" step="0.01" type="range" />
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

<script>
/* eslint-disable */
import { ref } from '@vue/composition-api';
import Scene from '@/components/three/Scene.vue';
import { useAxesHelper } from '@/app/three/utils/useAxesHelper';
import { Object3D } from 'three';
import { useAmbientLight } from '@/app/three/lights/useAmbientLight';
import { useBox } from '@/app/three/geometries/useBox';
import { useGroup } from '@/app/three/utils/useGroup';

export default {
  setup() {
    const cameraAngle = ref(35);
    const cameraDistance = ref(5);
    const debug = true;
    const position = ref({ x: 0, y: 0, z: 0 });
    const position2 = ref({ x: 0, y: 0, z: 0 });
    const hidden = ref(false);

    const children = useGroup({}, [
      useAxesHelper(),
      useAmbientLight(),
      useBox({
        color: 0xff0000,
        depth: 1,
        height: 1,
        hidden,
        position,
        width: 1,
      }, {
        u: useBox({
          color: 0x00ff00,
          debug,
          depth: 0.1,
          height: 0.5,
          position: position2,
          width: 0.5,
        }),
        l: useBox({
          color: 0x00ffff,
          debug,
          depth: 0.1,
          height: 0.5,
          position: position2,
          width: 0.5,
        }),
        f: useBox({
          color: 0x0000ff,
          debug,
          depth: 0.1,
          height: 0.5,
          position: position2,
          width: 0.5,
        }),
        r: useBox({
          color: 0xff00ff,
          debug,
          depth: 0.1,
          height: 0.5,
          position: position2,
          width: 0.5,
        }),
        b: useBox({
          color: 0xffffff,
          debug,
          depth: 0.1,
          height: 0.5,
          position: position2,
          width: 0.5,
        }),
        d: useBox({
          color: 0xffff00,
          debug,
          depth: 0.1,
          height: 0.5,
          position: position2,
          width: 0.5,
        })
      }),
    ]);

    return {
      cameraAngle,
      cameraDistance,
      children,
      hidden,
      position,
      position2,
    };
  },
  components: {
    Scene,
  },
};
</script>
