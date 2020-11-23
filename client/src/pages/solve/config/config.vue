<template>
  <div class="max-w-5xl w-full">
    <component
      :is="configComponent" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { isCube, isDodecaminx } from '@/app/utils/twister';
import { useRoute } from 'vue-router';
import VCubeConfig from '@/partials/solve/cube-config.vue';
import VDodecaminxConfig from '@/partials/solve/dodecaminx-config.vue';

export default defineComponent({
  setup() {
    const route = useRoute();
    
    const configComponent = computed(() => {
      const puzzle = route.params.puzzle as string;

      if (isCube(puzzle)) {
        return VCubeConfig;
      }

      if (isDodecaminx(puzzle)) {
        return VDodecaminxConfig;
      }
    });

    return {
      configComponent,
    };
  },
});
</script>
