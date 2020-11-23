<template>
  <v-label :label="label" :required="required">
    <v-input
      :autofocus="autofocus"
      :disabled="disabled"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :type="type"
      :value="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)" />
  </v-label>
</template>

<script lang="ts">
import VInput from '@/components/input.vue';
import VLabel from '@/components/label.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    VInput,
    VLabel,
  },
  props: {
    autofocus: Boolean,
    disabled: Boolean,
    label: {
      required: true,
      type: String,
    },
    modelValue: [Number, String],
    name: String,
    placeholder: String,
    required: Boolean,
    type: String,
  },
});
</script>
