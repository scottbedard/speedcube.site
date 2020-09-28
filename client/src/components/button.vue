<template>
  <component
    class="border-none font-bold h-10 px-6 rounded text-white focus:outline-none focus:shadow-outline hover:shadow"
    :class="[color]"
    :href="href"
    :is="is"
    :to="to">
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  computed: {
    color() {
      if (this.theme === 'primary') {
        return 'bg-green-600 hover:bg-green-500';
      }

      return 'bg-gray-700 hover:bg-gray-600';
    },
    is() {
      if (this.href) {
        return 'a';
      }

      if (this.to) {
        return 'nuxt-link';
      }

      return 'button';
    },
  },
  props: {
    href: String,
    theme: String,
    to: [Object, String],
  },
});
</script>