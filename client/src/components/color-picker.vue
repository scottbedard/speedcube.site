<template>
  <div
    class="h-8 inline-block relative rounded-full shadow w-8"
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
        class="absolute bg-gray-800 left-0 ml-12 p-4 rounded shadow text-gray-900 top-0 w-64"
        :class="[
          activeElement ? 'cursor-grabbing' : 'cursor-default',
        ]"
        @click.stop>
        
        <div
          class="h-32 mb-6"
          :style="{
            background: `hsl(${hueAlpha * 360}, 100%, 50%)`,
          }" />

        <div
          data-hue
          class="h-3 relative rounded w-full"
          ref="hueElement"
          @mousedown="onHueMousedown">
          <div
            class="absolute bg-gray-100 h-4 rounded-full shadow transform -translate-x-1/2 -translate-y-1/2 top-1/2 w-4"
            :class="[
              activeElement === 'hue' ? 'cursor-grabbing' : 'cursor-grab',
            ]"
            :style="{
              left: `${hueAlpha * 100}%`,
              top: '50%',
            }" />
        </div>
      </div>
    </transition>
  </div>

  <pre>{{ { activeElement } }}</pre>
</template>

<script lang="ts">
/* eslint-disable */
import { clamp } from 'lodash-es';
import { computed, defineComponent, ref, watch } from 'vue';
import { onClickOutside, useEventListener, useMouseInElement } from '@vueuse/core';

type ActiveElement = 'color' | 'hue' | null;

export default defineComponent({
  setup() {
    const activeElement = ref<ActiveElement>(null);
    const container = ref<HTMLElement>();
    const expanded = ref(false);
    const hueElement = ref<HTMLElement>();
    const hueAlpha = ref(0);
    const mouseIsActive = ref(false);
    const value = ref('#f00');

    // the active element represents the current drag-and-drop container
    const setActiveElement = (el: ActiveElement) => {
      activeElement.value = el;
    }

    watch(activeElement, (value) => {
      if (value) {
        document.body.classList.add('select-none');
      } else {
        document.body.classList.remove('select-none');
      }
    });

    // manage expanded state
    const onContainerClick = () => {
      expanded.value = true;
    };

    onClickOutside(container, () => {
      document.body.classList.remove('select-none');
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
    const { elementX: hueX, elementWidth: hueWidth } = useMouseInElement(hueElement);

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
      hueElement,
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
  background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
}
</style>