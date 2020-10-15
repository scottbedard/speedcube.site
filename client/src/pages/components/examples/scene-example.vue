<template>
  <p class="max-w-2xl mb-12">
    Scenes represent containers for 3D components. Their bounding
    box is used by the renderer to determine where 3D components
    should exist. Scenes can be sized using traditional CSS methods,
    and will resize responsively.
  </p>

  <div class="max-w-xl mx-auto">
    <v-scene
      class="mb-6"
      :camera-angle="cameraAngle"
      :camera-distance="cameraDistance">
      <!--
        an inner div can be used to maintain aspect ratios
      -->
      <div :style="{ paddingBottom: '56.25%' }" />

      <!--
        3D components will automatically add/remove themselves
        from their parents via provide/inject.
      -->
      <v-group :position="groupPosition">
        <v-axes-helper />
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

    <div>
      <div>Group position</div>
      <div class="gap-6 grid sm:grid-cols-3">
        <div>
          <div>X</div>
          <v-range-input
            v-model="groupPosition.x"
            :max="10"
            :min="-10"
            :step="0.01" />
        </div>
        <div>
          <div>Y</div>
          <v-range-input
            v-model="groupPosition.y"
            :max="10"
            :min="-10"
            :step="0.01" />
        </div>
        <div>
          <div>Z</div>
          <v-range-input
            v-model="groupPosition.z"
            :max="10"
            :min="-10"
            :step="0.01" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VAxesHelper from '@/components/three/utils/axes-helper.vue';
import VGroup from '@/components/three/utils/group.vue';
import VRangeInput from '@/components/range-input.vue';
import VScene from '@/components/three/scene.vue';

export default defineComponent({
  components: {
    VAxesHelper,
    VGroup,
    VRangeInput,
    VScene,
  },
  data() {
    return {
      cameraAngle: 20,
      cameraDistance: 5,
      groupPosition: { x: 0, y: 0, z: 0 },
    };
  },
});
</script>