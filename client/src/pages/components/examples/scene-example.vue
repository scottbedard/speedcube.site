<template>
  <p class="max-w-2xl mb-12">
    Scenes represent containers for 3D components. Their bounding
    box is used by the renderer to determine where 3D components
    should exist. Scenes can be sized using traditional CSS methods,
    and will resize responsively.
  </p>

  <div class="max-w-md mx-auto">
    <v-scene
      class="mb-6"
      square
      :camera-angle="cameraAngle"
      :camera-distance="cameraDistance">
      <v-group :position="groupPosition">
        <!-- <v-axes-helper /> -->
        <v-box-geometry
          :dimensions="boxDimensions"
          :position="boxPosition">
          <template #up>
            <v-axes-helper />
          </template>
          <template #left>
            <v-axes-helper />
          </template>
          <template #front>
            <v-axes-helper />
          </template>
          <template #right>
            <v-axes-helper />
          </template>
          <template #back>
            <v-axes-helper />
          </template>
          <template #down>
            <v-axes-helper />
          </template>
        </v-box-geometry>
      </v-group>
    </v-scene>

    <div class="gap-6 grid mb-6 sm:grid-cols-2">
      <div>
        <div>Camera angle</div>
        <v-range-input
          v-model="cameraAngle"
          :max="90"
          :min="0"
          :step="0.01" />
      </div>
      <div>
        <div>Camera distance</div>
        <v-range-input
          v-model="cameraDistance"
          :max="10"
          :min="0"
          :step="0.01" />
      </div>
    </div>

    <div class="mb-6">
      <div>Group position</div>
      <div class="gap-6 grid sm:grid-cols-3">
        <div>
          <div>X</div>
          <v-range-input
            v-model="groupPosition.x"
            :max="5"
            :min="-5"
            :step="0.01" />
        </div>
        <div>
          <div>Y</div>
          <v-range-input
            v-model="groupPosition.y"
            :max="5"
            :min="-5"
            :step="0.01" />
        </div>
        <div>
          <div>Z</div>
          <v-range-input
            v-model="groupPosition.z"
            :max="5"
            :min="-5"
            :step="0.01" />
        </div>
      </div>
    </div>

    <div>
      <div>Box position</div>
      <div class="gap-6 grid sm:grid-cols-3">
        <div>
          <div>X</div>
          <v-range-input
            v-model="boxPosition.x"
            :max="5"
            :min="-5"
            :step="0.01" />
        </div>
        <div>
          <div>Y</div>
          <v-range-input
            v-model="boxPosition.y"
            :max="5"
            :min="-5"
            :step="0.01" />
        </div>
        <div>
          <div>Z</div>
          <v-range-input
            v-model="boxPosition.z"
            :max="5"
            :min="-5"
            :step="0.01" />
        </div>
      </div>
    </div>

    <div>
      <div>Box dimensions</div>
      <div class="gap-6 grid sm:grid-cols-3">
        <div>
          <div>Height</div>
          <v-range-input
            v-model="boxDimensions.height"
            :max="5"
            :min="-5"
            :step="0.01" />
        </div>
        <div>
          <div>Width</div>
          <v-range-input
            v-model="boxDimensions.width"
            :max="5"
            :min="-5"
            :step="0.01" />
        </div>
        <div>
          <div>Depth</div>
          <v-range-input
            v-model="boxDimensions.depth"
            :max="5"
            :min="-5"
            :step="0.01" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VAxesHelper from '@/components/three/utils/axes-helper.vue';
import VBoxGeometry from '@/components/three/geometries/box-geometry.vue';
import VGroup from '@/components/three/utils/group.vue';
import VRangeInput from '@/components/range-input.vue';
import VScene from '@/components/three/scene.vue';

export default defineComponent({
  components: {
    VAxesHelper,
    VBoxGeometry,
    VGroup,
    VRangeInput,
    VScene,
  },
  data() {
    return {
      boxDimensions: { depth: 1, width: 1, height: 1 },
      boxPosition: { x: 0, y: 0, z: 0 },
      cameraAngle: 20,
      cameraDistance: 5,
      groupPosition: { x: 0, y: 0, z: 0 },
    };
  },
});
</script>