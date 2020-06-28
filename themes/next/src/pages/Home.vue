<template>
  <div>
    <div class="max-w-md mx-auto">
      <button @click="show = !show">toggle</button>
      <Scene v-if="show" square/>
    </div>
  </div>
</template>

<script>
import Scene from '@/components/three/Scene.vue';

export default {
  components: {
    Scene,
  },
  data() {
    return {
      show: true,
    };
  },
};
</script>
