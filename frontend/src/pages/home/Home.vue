<template>
  <div class="flex">
    <scene>
      <div>Hello from the scene</div>
    </scene>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Scene from '@/components/three/scene/Scene.vue';

export default defineComponent({
  components: {
    Scene,
  },
});
</script>
