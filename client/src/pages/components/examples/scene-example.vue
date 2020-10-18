<template>
  <!--
    scenes represent containers for 3D components. their bounding
    box is used by the renderer to determine where 3D components
    should exist. scenes can be sized using traditional CSS methods,
    and will resize responsively.
  -->
  <v-scene
    class="max-w-md mb-6"
    square
    :camera-angle="cameraAngle"
    :camera-distance="cameraDistance">
    <!--
      ambient lights are used to globally illuminate scenes. they don't
      cast shadows because they have no direction or position.
    -->
    <v-ambient-light color="#0f0f00" />

    <!--
      point lights illuminate equally in all directions from a specific
      position. think of these sort of like a bare light bulb.
    -->
    <v-point-light :position="{ y: 5, z: 3 }" />

    <!--
      groups provide a way to organize the nesting context of child
      components. grouped components can be controlled by a single
      set of position / rotation props.
    -->
    <v-group
      :position="position"
      :rotation="[rotation.x, rotation.y, rotation.z, rotation.deg]">
      <!--
        axes helpers are useful when creating scenes, but obviously
        have to be removed before shipping a puzzle.
      -->
      <v-axes-helper />

      <!--
        geometry components expose slots for common puzzle shapes.
        they are useful when positioning stickers, and will eventually
        handle raycasting to emit mouse events.
      -->
      <v-box-geometry visible :dimensions="dimensions">
        <template #up>
          <v-sphere-geometry color="#ff0" wireframe visible :radius="0.1" />
        </template>
        <template #front>
          <v-sphere-geometry color="#00f" wireframe visible :radius="0.1" />
        </template>
      </v-box-geometry>
    </v-group>
  </v-scene>

  <div class="gap-6 grid max-w-md">
    <div class="gap-6 grid sm:grid-cols-2">
      <div>
        <div>Camera angle</div>
        <v-range-input v-model="cameraAngle" :max="90" :min="0" :step="0.01" />
      </div>
      <div>
        <div>Camera distance</div>
        <v-range-input v-model="cameraDistance" :max="10" :min="0" :step="0.01" />
      </div>
    </div>

    <div>
      <div>Position</div>
      <div class="gap-6 grid sm:grid-cols-3">
        <div>
          <div class="text-gray-500 text-xs">X</div>
          <v-range-input v-model="position.x" :max="5" :min="-5" :step="0.01" />
        </div>
        <div>
          <div class="text-gray-500 text-xs">Y</div>
          <v-range-input v-model="position.y" :max="5" :min="-5" :step="0.01" />
        </div>
        <div>
          <div class="text-gray-500 text-xs">Z</div>
          <v-range-input v-model="position.z" :max="5" :min="-5" :step="0.01" />
        </div>
      </div>
    </div>

    <div>
      <div>Dimensions</div>
      <div class="gap-6 grid sm:grid-cols-3">
        <div>
          <div class="text-gray-500 text-xs">Height</div>
          <v-range-input v-model="dimensions.height" :max="5" :min="0" :step="0.01" />
        </div>
        <div>
          <div class="text-gray-500 text-xs">Width</div>
          <v-range-input v-model="dimensions.width" :max="5" :min="0" :step="0.01" />
        </div>
        <div>
          <div class="text-gray-500 text-xs">Depth</div>
          <v-range-input v-model="dimensions.depth" :max="5" :min="0" :step="0.01" />
        </div>
      </div>
    </div>

    <div>
      <div>Rotation</div>
      <div class="gap-6 grid sm:grid-cols-4">
        <div>
          <div class="text-gray-500 text-xs">X</div>
          <v-range-input v-model="rotation.x" :max="10" :min="-10" :step="0.01" />
        </div>
        <div>
          <div class="text-gray-500 text-xs">Y</div>
          <v-range-input
            v-model="rotation.y"
            :max="10"
            :min="-10"
            :step="0.01" />
        </div>
        <div>
          <div class="text-gray-500 text-xs">Z</div>
          <v-range-input v-model="rotation.z" :max="10" :min="-10" :step="0.01" />
        </div>
        <div>
          <div class="text-gray-500 text-xs">Degrees</div>
          <v-range-input v-model="rotation.deg" :max="360" :min="-360" :step="0.01" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VAmbientLight from '@/components/three/lights/ambient-light.vue';
import VAxesHelper from '@/components/three/utils/axes-helper.vue';
import VBoxGeometry from '@/components/three/geometries/box-geometry.vue';
import VGroup from '@/components/three/utils/group.vue';
import VPointLight from '@/components/three/lights/point-light.vue';
import VRangeInput from '@/components/range-input.vue';
import VScene from '@/components/three/scene.vue';
import VSphereGeometry from '@/components/three/geometries/sphere-geometry.vue';

export default defineComponent({
  components: {
    VAmbientLight,
    VAxesHelper,
    VBoxGeometry,
    VGroup,
    VPointLight,
    VRangeInput,
    VScene,
    VSphereGeometry,
  },
  data() {
    return {
      cameraAngle: 20,
      cameraDistance: 3,
      dimensions: { depth: 1, width: 1, height: 1 },
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0, deg: 0 },
    };
  },
});
</script>