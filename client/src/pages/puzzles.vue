<template>
  <h1 class="font-bold mb-6 text-center text-2xl">Select a puzzle</h1>
  <div class="gap-6 grid grid-cols-2 max-w-6xl mx-auto sm:grid-cols-3 lg:grid-cols-4 lg:gap-20">
    <router-link
      v-for="[puzzle, model] in puzzles"
      :key="puzzle.param"
      :to="{
        name: 'solve',
        params: { puzzle },
      }">
      <v-puzzle
        :model="model"
        :type="puzzle" />
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Cube, Dodecaminx } from '@bedard/twister';
import VPuzzle from '@/components/puzzle/puzzle.vue';

export default defineComponent({
  setup() {
    const puzzles = [
      ['2x2', new Cube({ size: 2 })],
      ['3x3', new Cube({ size: 3 })],
      ['4x4', new Cube({ size: 4 })],
      ['5x5', new Cube({ size: 5 })],
      ['kilominx', new Dodecaminx({ size: 2 })],
      ['megaminx', new Dodecaminx({ size: 3 })],
      ['masterminx', new Dodecaminx({ size: 4 })],
      ['gigaminx', new Dodecaminx({ size: 5 })],
    ];

    return {
      puzzles,
    };
  },
  components: {
    VPuzzle,
  },
});
</script>
