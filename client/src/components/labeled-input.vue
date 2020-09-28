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
      :value="value"
      @input="onInput" />
  </label>
</template>

<script lang="ts">
import VInput from '@/components/input.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    VInput,
  },
  methods: {
    onInput(value: string) {
      this.$emit('input', value);
    },
  },
  props: {
    autofocus: Boolean,
    disabled: Boolean,
    label: {
      required: true,
      type: String,
    },
    placeholder: String,
    required: Boolean,
    type: String,
    value: [Number, String],
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
