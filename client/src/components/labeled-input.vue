<template>
  <label>
    <div
      v-text="label"
      class="font-bold mb-1"
      :data-required="required" />
    <v-input
      :autofocus="autofocus"
      :disabled="disabled"
      :placeholder="placeholder"
      :required="required"
      :type="type"
      :value="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)" />
  </label>
</template>

<script lang="ts">
import VInput from '@/components/input.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    VInput,
  },
  props: {
    autofocus: Boolean,
    disabled: Boolean,
    label: {
      required: true,
      type: String,
    },
    modelValue: [Number, String],
    placeholder: String,
    required: Boolean,
    type: String,
  },
});
</script>

<style scoped>
[data-required]:after {
  content: '';
  height: 0.35rem;
  width: 0.35rem;
  @apply align-text-top inline-block bg-green-500 ml-1 rounded-full;
}
</style>
