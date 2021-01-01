<template>
  <nav
    class="grid py-3"
    :aria-label="label">
    <router-link
      v-for="(link, index) in links"
      class="flex h-12 items-center"
      :key="index"
      :to="link.to">
      <span class="inline-flex justify-center w-16">
        <v-icon
          :name="link.icon"
          :size="6"
          :stroke="2" />
      </span>
      {{ link.text }}
    </router-link>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VIcon from '@/components/icon.vue';

export default defineComponent({
  components: {
    VIcon,
  },
  props: {
    label: {
      required: true,
      type: String,
    },
    links: {
      required: true,
      type: Array,
    },
  },
});
</script>
