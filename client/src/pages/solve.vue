<template>
  <div>
    <h1 class="font-bold text-2xl">Hello from the solve page</h1>
    <p class="mb-12">For now, this will serve as a sandbox for our 3D composition functions.</p>
    
    <div class="flex justify-center">
      <v-puzzle class="max-w-sm" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VPuzzle from '@/components/puzzle/puzzle.vue';

export default defineComponent({
  data() {
    return {
      count: 1,
    };
  },
  components: {
    VPuzzle,
  },
});
</script>
