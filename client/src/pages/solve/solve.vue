<template>
  <v-unknown-puzzle v-if="!model" />

  <template v-else>
    <v-puzzle
      class="max-w-md mx-auto"
      :model="model" />
  </template>
</template>

<script lang="ts"> 
import { defineComponent } from 'vue';
import { useModel } from './model';
import { useRoute } from 'vue-router';
import VPuzzle from '@/components/puzzle/puzzle.vue';
import VUnknownPuzzle from '@/partials/solve/unknown-puzzle.vue';

export default defineComponent({
  setup() {
    const route = useRoute();
    const model = useModel({ route });

    return {
      model,
    };
  },
  components: {
    VPuzzle,
    VUnknownPuzzle,
  },
});
</script>
