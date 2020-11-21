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
        class="absolute cursor-default bg-gray-800 left-0 ml-12 p-3 rounded shadow text-gray-900 top-0 w-64"
        @click.stop>
        
        <div class="px-2">
          <div
            data-hue-selector
            class="h-3 relative rounded w-full"
            ref="hue">
            <div
              class="absolute bg-gray-100 h-4 rounded-full shadow transform -translate-x-1/2 -translate-y-1/2 top-1/2 w-4"
              :style="{
                left: `${hueXLeft}%`,
                top: '50%',
              }" />
          </div>
        </div>
      </div>
    </transition>
  </div>

  <pre>{{ { hueXLeft, hueX, hueWidth } }}</pre>
</template>

<script lang="ts">
/* eslint-disable */
import { clamp } from 'lodash-es';
import { computed, defineComponent, ref } from 'vue';
import { onClickOutside, useMouseInElement } from '@vueuse/core';

export default defineComponent({
  setup() {
    const container = ref<HTMLElement>();
    const expanded = ref(false);
    const hue = ref<HTMLElement>();
    const value = ref('#f00');

    // manage expanded state
    const expand = () => {
      expanded.value = true;
    };

    onClickOutside(container, () => {
      expanded.value = false;
    });

    // hue selector mouse interactions
    const { elementX: hueX, elementWidth: hueWidth } = useMouseInElement(hue);

    const hueXLeft = computed(() => clamp(hueX.value / hueWidth.value, 0, 1) * 100);

    return {
      container,
      expand,
      expanded,
      hue,
      value,
      hueX,
      hueXLeft,
      hueWidth,
    };
  },
});
</script>

<style lang="scss" scoped>
[data-hue-selector] {
  background: linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
}
</style>