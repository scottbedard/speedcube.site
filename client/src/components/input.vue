
<template>
  <input
    class="block bg-gray-100 h-10 outline-none placeholder-gray-500 px-3 rounded text-gray-800 w-full focus:shadow-outline"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  mounted() {
    if (this.autofocus) {
      this.$el.focus();
    }
  },
  props: {
    autofocus: Boolean,
    modelValue: [Number, String],
  },
});
</script>