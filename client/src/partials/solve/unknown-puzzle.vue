<template>
  <h1 class="font-bold text-2xl">Unknown puzzle <strong>&quot;{{ puzzle }}&quot;</strong></h1>
  <p>
    Sorry, but we don't recognize that puzzle ID.
    <router-link :to="{ name: 'solve', params: { puzzle: '3x3' }}">Want to solve a 3x3 instead?</router-link>
  </p>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();
    const puzzle = computed(() => route.params.puzzle);

    return {
      puzzle,
    };
  },
});
</script>
