<template>
  <div
    class="cursor-pointer h-8 inline-block relative rounded-full shadow w-8"
    ref="container"
    :style="{
      background: value,
    }"
    @click.prevent="expand">

    <transition
      enter-active-class="duration-150 ease-in-out transition transform"
      enter-from-class="opacity-0 -translate-x-6"
      enter-to-class="opacity-75 translate-x-0"
      leave-active-class="duration-150 ease-in-out transition transform"
      leave-from-class="opacity-75 translate-x-0"
      leave-to-class="opacity-0 -translate-x-6">
      <div
        v-if="expanded"
        class="absolute cursor-default bg-gray-100 left-0 ml-12 p-3 rounded shadow text-gray-900 top-0"
        @click.stop>
        Hello
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

export default defineComponent({
  setup() {
    const container = ref<HTMLElement>();
    const expanded = ref(false);
    const value = ref('#f00');

    // manage expanded state
    const expand = () => {
      expanded.value = true;
    };

    onClickOutside(container, () => {
      expanded.value = false;
    });

    return {
      container,
      expand,
      expanded,
      value,
    };
  },
});
</script>
