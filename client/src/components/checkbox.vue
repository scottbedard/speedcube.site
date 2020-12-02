<style lang="scss">
@keyframes checkbox {
  from { stroke-dashoffset: 50 }
  to { stroke-dashoffset: 0 }
}
</style>

<template>
  <div
    class="flex items-center"
    :class="{
      'cursor-pointer': !disabled,
    }"
    @click="toggle">
    <div
      class="bg-gray-700 flex items-center justify-center h-6 rounded w-6 focus:outline-none focus:shadow-outline"
      ref="target"
      role="checkbox"
      :aria-checked="modelValue ? 'true' : 'false'"
      :class="{
        'opacity-50': disabled,
      }"
      :tabindex="disabled ? null : 0"
      @keypress.space.prevent="toggle">
      <svg
        class="text-green-500 w-4/5"
        focusable="false"
        version="1.1"
        viewBox="0 0 24 24">
        <path
          d="M4.1,12.7 9,17.6 20.3,6.3"
          fill="none"
          stroke="currentColor"
          stroke-dasharray="50"
          stroke-dashoffset="50"
          stroke-width="4"
          :style="{
            animation: modelValue
              ? 'checkbox 50ms cubic-bezier(.41,.88,.84,-0.45) 50ms 1 normal forwards'
              : null,
          }"
        />
      </svg>
    </div>
    <div class="ml-2">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup(props, { emit }) {
    const target = ref<HTMLElement>();

    const toggle = () => {
      target.value?.focus();
  
      if (!props.disabled) {
        emit('update:modelValue', !props.modelValue);
      }
    }

    return {
      target,
      toggle,
    };
  },
  emits: [
    'update:modelValue',
  ],
  props: {
    disabled: {
      default: false,
      type: Boolean,
    },
    modelValue: {
      default: false,
      type: Boolean,
    },
  },
});
</script>
