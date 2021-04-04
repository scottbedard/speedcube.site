<template>
  <div>
    <div class="mb-px">
      <label
        v-if="label"
        v-text="label"
        :for="id" />
      <sup
        v-if="required"
        class="bg-green-500 h-1.5 inline-block mb-1 ml-0.5 rounded-full w-1.5" />
    </div>

    <input
      class="appearance-none block bg-gray-100 border border-gray-200 min-h-12 placeholder-gray-400 px-4 py-2 rounded-md text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-800 dark:text-gray-100"
      ref="input"
      :disabled="disabled"
      :id="id"
      :placeholder="placeholder"
      :required="required"
      :type="type"
      :value="modelValue"
      @input="onInput" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { uniqueId } from 'lodash-es'

export default defineComponent({
  setup(props, { emit }) {
    const input = ref<HTMLInputElement>()

    const onInput = () => {
      emit('update:modelValue', input.value?.value)
    }
  
    onMounted(() => {
      if (props.autofocus) {
        input.value?.focus()
      }
    })

    return {
      input,
      onInput
    }
  },
  emits: [
    'update:modelValue',
  ],
  name: 'Input',
  props: {
    autofocus: {
      default: false,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    id: {
      default: () => `input-${uniqueId()}`,
      type: String,
    },
    label: {
      type: String,
    },
    modelValue: {
      default: '',
      type: [Number, String],
    },
    placeholder: {
      type: String
    },
    required: {
      default: false,
      type: Boolean,
    },
    type: {
      default: 'text',
      type: String,
    },
  },
})
</script>