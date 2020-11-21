<template>
  <div
    class="h-8 inline-block relative rounded-full shadow w-8"
    style="background: #f00"
    ref="container"
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
        class="absolute bg-gray-800 left-0 ml-12 overflow-hidden rounded shadow text-gray-900 top-0 w-64"
        :class="[activeElement ? 'cursor-grabbing' : 'cursor-default']"
        @click.stop>
        <!-- color box -->
        <div
          class="h-32 relative"
          ref="colorElement"
          :style="{
            backgroundColor: `hsl(${hueAlpha * 360}, 100%, 50%)`,
          }"
          @mousedown="onColorMousedown">
          <div class="absolute h-full w-full" data-saturation-white />
          <div class="absolute h-full w-full" data-saturation-black />
          <div
            class="absolute border-4 border-white-500 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 w-4"
            :class="[
              activeElement === 'color' ? 'cursor-grabbing' : 'cursor-grab',
            ]"
            :style="{
              left: `${colorSelectorX * 100}%`,
              top: `${colorSelectorY * 100}%`,
            }" />
        </div>

        <!-- hue selector -->
        <div class="px-4 py-4">
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
              }" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { clamp, throttle } from 'lodash-es';
import { computed, defineComponent, ref, watch } from 'vue';
import { hsvToRgb } from '@/app/utils/color';
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
      setActiveElement(null);
    });

    // track the mouse state
    const onMousedown = () => {
      mouseIsActive.value = true;
    };

    const onMouseup = () => {
      mouseIsActive.value = false;
    };

    // color box
    const colorElement = ref<HTMLElement>();
    const colorSelectorX = ref(0);
    const colorSelectorY = ref(0);

    const {
      elementHeight: colorHeight,
      elementWidth: colorWidth,
      elementX: colorX,
      elementY: colorY,
    } = useMouseInElement(colorElement);

    const syncColor = () => {
      colorSelectorX.value = clamp(colorX.value / colorWidth.value, 0, 1);
      colorSelectorY.value = clamp(colorY.value / colorHeight.value, 0, 1);
    }

    const onColorMousedown = () => {
      syncColor();
      setActiveElement('color');
    }

    // hue selector mouse interactions
    const {
      elementWidth: hueWidth,
      elementX: hueX,
    } = useMouseInElement(hueElement);

    const syncHue = () => {
      hueAlpha.value = clamp(hueX.value / hueWidth.value, 0, 1);
    }

    const onHueMousedown = () => {
      syncHue();
      setActiveElement('hue');
    }

    // update draggable items on mousemove
    useEventListener(document, 'mousemove', () => {
      if (mouseIsActive.value) {
        if (activeElement.value === 'hue') syncHue();
        else if (activeElement.value === 'color') syncColor();
      }
    });

    useEventListener(document, 'mouseup', () => setActiveElement(null));

    // calculate selected color
    watch([hueAlpha, colorSelectorX, colorSelectorY], () => {
      const h = hueAlpha.value;
      const s = colorSelectorX.value;
      const v = 1 - colorSelectorY.value;
      const [r, g, b] = hsvToRgb(h, s, v);

      if (container.value) {
        container.value.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      }
    });

    return {
      activeElement,
      colorElement,
      colorSelectorX,
      colorSelectorY,
      container,
      expanded,
      hueAlpha,
      hueElement,
      onColorMousedown,
      onContainerClick,
      onHueMousedown,
      onMousedown,
      onMouseup,
      setActiveElement,
    };
  },
});
</script>

<style lang="scss" scoped>
[data-hue] {
  background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
}

[data-saturation-white] {
  background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
}

[data-saturation-black] {
  background: linear-gradient(to top, #000, rgba(0, 0, 0, 0));
}
</style>