
<template>
  <input
    class="block bg-gray-100 h-10 outline-none placeholder-gray-500 px-3 rounded text-gray-800 w-full focus:shadow-outline"
    :value="value"
    @input="onInput" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  mounted() {
    if (this.autofocus) {
      this.$el.focus();
    }
  },
  methods: {
    onInput(e: Event) {
      this.$emit('input', (e.target as HTMLInputElement).value);
    },
  },
  props: {
    autofocus: Boolean,
    value: [Number, String],
  },
});
</script>