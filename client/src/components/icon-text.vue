<template>
  <div class="flex items-center">
    <v-icon
      class="mr-3"
      size="5"
      stroke="2"
      :name="icon" />
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VIcon from '@/components/icon.vue';

export default defineComponent({
  components: {
    VIcon,
  },
  props: {
    icon: {
      required: true,
      type: String,
    },
  },
});
</script>
