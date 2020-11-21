<template>
  <div
    class="cursor-pointer h-8 inline-block relative rounded-full shadow w-8"
    ref="container"
    :style="{
      background: value,
    }"
    @click.prevent="onContainerClick"
    @mousedown="onMousedown"
    @mouseup="onMouseup">

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
            data-hue
            class="h-3 relative rounded w-full"
            ref="hue"
            @mousedown="onHueMousedown">
            <div
              class="absolute bg-gray-100 h-4 rounded-full shadow transform -translate-x-1/2 -translate-y-1/2 top-1/2 w-4"
              :style="{
                left: `${hueAlpha * 100}%`,
                top: '50%',
              }" />
          </div>
        </div>
      </div>
    </transition>
  </div>

  <pre>{{ { activeElement } }}</pre>
</template>

<script lang="ts">
/* eslint-disable */
import { clamp } from 'lodash-es';
import { computed, defineComponent, ref } from 'vue';
import { onClickOutside, useEventListener, useMouseInElement } from '@vueuse/core';

type ActiveElement = 'color' | 'hue' | null;

export default defineComponent({
  setup() {
    const activeElement = ref<ActiveElement>(null);
    const container = ref<HTMLElement>();
    const expanded = ref(false);
    const hue = ref<HTMLElement>();
    const hueAlpha = ref(0);
    const mouseIsActive = ref(false);
    const value = ref('#f00');

    // set the active element
    const setActiveElement = (el: ActiveElement) => {
      activeElement.value = el;
    }

    // manage expanded state
    const onContainerClick = () => {
      expanded.value = true;
    };

    onClickOutside(container, () => {
      expanded.value = false;
    });

    // track the mouse state
    const onMousedown = () => {
      mouseIsActive.value = true;
    };

    const onMouseup = () => {
      mouseIsActive.value = false;
    };

    // hue selector mouse interactions
    const { elementX: hueX, elementWidth: hueWidth } = useMouseInElement(hue);

    const setHueAlpha = () => {
      hueAlpha.value = clamp(hueX.value / hueWidth.value, 0, 1);
    }

    const onHueMousedown = () => {
      setHueAlpha();
      setActiveElement('hue');
    }

    // update draggable items on mousemove
    useEventListener(document, 'mousemove', () => {
      if (mouseIsActive.value) {
        if (activeElement.value === 'hue') setHueAlpha();
      }
    });

    useEventListener(document, 'mouseup', () => setActiveElement(null));

    return {
      activeElement,
      container,
      expanded,
      hue,
      hueAlpha,
      onContainerClick,
      onHueMousedown,
      onMousedown,
      onMouseup,
      setActiveElement,
      value,
    };
  },
});
</script>

<style lang="scss" scoped>
[data-hue] {
  background: linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
}
</style>