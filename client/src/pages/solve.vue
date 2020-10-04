<template>
  <div>
    Hello from the solve page

    <div v-for="n in 35" v-text="`A: ${n}`" :key="`a-${n}`" />

    <v-button @click="count++">+</v-button>&nbsp;
    <v-button @click="count--">-</v-button>
    <br />
    <v-scene
      v-for="n in count"
      class="max-w-xs"
      square
      :key="`S${n}`" />

    <div v-for="n in 35" v-text="`B: ${n}`" :key="`b-${n}`" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VButton from '@/components/button.vue';
import VScene from '@/components/three/scene.vue';

export default defineComponent({
  data() {
    return {
      count: 1,
    };
  },
  components: {
    VButton,
    VScene,
  },
});
</script>
