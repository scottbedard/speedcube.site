<template>
  <v-label :label="label" :required="required">
    <v-input
      :autofocus="autofocus"
      :class="{
        'font-mono': monospaceInput, 
      }"
      :disable-spellcheck="disableSpellcheck"
      :disabled="disabled"
      :maxlength="maxlength"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :type="type"
      :value="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)" />
    <p
      v-if="errorMessage"
      v-text="errorMessage"
      class="mt-2 text-red-500 text-sm" />
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
    disableSpellcheck: Boolean,
    errorMessage: String,
    label: { required: true, type: String },
    maxlength: [Number, String],
    modelValue: [Number, String],
    monospaceInput: Boolean,
    name: String,
    placeholder: String,
    required: Boolean,
    type: String,
  },
});
</script>
