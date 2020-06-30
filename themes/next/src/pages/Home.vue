<template>
  <div>
    <div class="max-w-md mx-auto">
      <button
        class="bg-gray-300 mr-4 mb-4 p-2 rounded hover:bg-gray-400"
        @click="show = !show">
        toggle scene
      </button>

      <button
        class="bg-gray-300 mr-4 mb-4 p-2 rounded hover:bg-gray-400"
        @click="toggleChildren">
        toggle children
      </button>

      <Scene
        v-if="show"
        square
        :camera-angle="cameraAngle"
        :camera-distance="cameraDistance"
        :children="children"
      />

      <div class="mt-4">
        <label class="block mb-4">
          <div>Camera Angle: {{ cameraAngle }}</div>
          <input v-model.number="cameraAngle" min="0" max="90" type="range" />
        </label>
        <label class="block mb-4">
          <div>Camera Distance: {{ cameraDistance }}</div>
          <input v-model.number="cameraDistance" min="0" max="1000" type="range" />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api';
import Scene from '@/components/three/Scene.vue';
import { useAxesHelper } from '@/app/three';

export default {
  setup() {
    const axesHelper = useAxesHelper();

    const children = ref([
      axesHelper,
    ]);

    const cameraAngle = ref(40);
    const cameraDistance = ref(100);
    const show = ref(true);

    const toggleChildren = () => {
      if (children.value.includes(axesHelper)) {
        children.value.splice(children.value.indexOf(axesHelper), 1);
      } else {
        children.value.push(axesHelper);
      }

      console.log('children', children.value);
    };

    return {
      cameraAngle,
      cameraDistance,
      children,
      show,
      toggleChildren,
    };
  },
  components: {
    Scene,
  },
};
</script>
