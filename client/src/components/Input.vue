<template>
  <div>
    <div class="mb-px">
      <label
        v-if="label"
        v-text="label"
        :for="id" />
    </div>

    <input
      class="appearance-none bg-gray-100 border border-gray-200 flex-1 placeholder-gray-400 px-4 py-2 rounded-md text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-800"
      ref="input"
      :id="id"
      :placeholder="placeholder"
      :type="type" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { uniqueId } from 'lodash-es'

export default defineComponent({
  setup(props) {
    const input = ref<HTMLInputElement>()
  
    onMounted(() => {
      if (props.autofocus) {
        input.value?.focus()
      }
    })

    return {
      input
    }
  },
  name: 'Input',
  props: {
    autofocus: {
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
    placeholder: {
      type: String
    },
    type: {
      default: 'text',
      type: String,
    },
  },
})
</script>