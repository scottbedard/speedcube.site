<template>
  <div>
    <Label
      v-if="label"
      class="mb-px"
      :for="id"
      :text="String(label)"
      :required="required" />

    <input
      class="appearance-none block bg-gray-100 border border-gray-300 min-h-12 placeholder-gray-400 px-4 py-2 rounded-md text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-800 dark:text-gray-100"
      ref="input"
      :disabled="disabled"
      :id="id"
      :placeholder="placeholder"
      :required="required"
      :type="type"
      :value="modelValue"
      @input="onInput" />
    
    <div
      v-if="errorMessage"
      v-text="errorMessage"
      class="text-red-500 text-sm" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref } from 'vue'
import { uniqueId } from 'lodash-es'
import Label from './Label.vue'

export default defineComponent({
  setup(props, { emit }) {
    const input = ref<HTMLInputElement>()

    const errorMessage = computed(() => {
      if (typeof props.error === 'string') {
        return props.error
      }

      if (Array.isArray(props.error)) {
        return props.error[0]
      }
    })

    const onInput = () => {
      emit('update:modelValue', input.value?.value)
    }
  
    onMounted(() => {
      if (props.autofocus) {
        input.value?.focus()
      }
    })

    return {
      errorMessage,
      input,
      onInput
    }
  },
  components: {
    Label,
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
    error: {
      default: '',
      type: [Array, String] as PropType<string | string[]>,
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