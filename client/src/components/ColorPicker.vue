<template>
  <div
    class="h-8 inline-block relative rounded-full shadow w-8"
    ref="container"
    :class="{
      'cursor-pointer': !disabled,
    }"
    :style="{ background: modelValue }"
    @click.prevent="expand">
    <Transition
      enter-active-class="duration-150 ease-in-out transition transform"
      enter-from-class="opacity-0 -translate-x-6"
      enter-to-class="opacity-75 translate-x-0"
      leave-active-class="duration-150 ease-in-out transition transform"
      leave-from-class="opacity-75 translate-x-0"
      leave-to-class="opacity-0 -translate-x-6">
      <div
        v-if="isExpanded"
        class="absolute left-0 ml-12 top-0 w-64 z-10"
        @click.stop>
        <Card
          class="overflow-hidden"
          :class="[activeElement ? 'cursor-grabbing' : 'cursor-default']">
          <!-- color box -->
          <div
            class="h-32 relative"
            ref="colorElement"
            :style="{ backgroundColor: `hsl(${hueSelector * 360}, 100%, 50%)` }"
            @mousedown="setActiveElement('color')">
            <div class="absolute h-full w-full" data-saturation-white />
            <div class="absolute h-full w-full" data-saturation-black />
            <div
              class="absolute border-4 border-white-500 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 w-4"
              :class="[activeElement === 'color' ? 'cursor-grabbing' : 'cursor-grab']"
              :style="{
                left: `${colorSelectorX * 100}%`,
                top: `${colorSelectorY * 100}%`,
              }" />
          </div>

          <!-- hue selector -->
          <div class="gap-3 grid p-3">
            <div class="flex items-center">
              <div
                class="bg-white h-6 items-center mr-2 rounded-full shadow w-6"
                :style="{ backgroundColor: currentValue }" />
              <div
                data-hue
                class="flex-1 h-3 ml-2 relative rounded"
                ref="hueElement"
                @mousedown="setActiveElement('hue')">
                <div
                  class="absolute bg-gray-100 h-4 rounded-full shadow transform -translate-x-1/2 -translate-y-1/2 top-1/2 w-4"
                  :class="[activeElement === 'hue' ? 'cursor-grabbing' : 'cursor-grab']"
                  :style="{ left: `${hueSelector * 100}%` }" />
              </div>
            </div>

            <!-- hex input and cancel button -->
            <div class="flex items-center justify-between">
              <input
                v-model="hexInput"
                class="bg-transparent border-b-1 border-transparent outline-none text-sm w-16"
                ref="hexElement"
                spellcheck="false"
                :class="[isInvalid ? 'text-red-500' : 'text-gray-800 dark:text-gray-200']"
                :maxlength="7" />
              <a
                class="flex items-center hover:no-underline text-gray-500 text-sm hover:text-red-500"
                href="#"
                title="Discard changes"
                @click.prevent="discard">
                <Icon name="trash-2" stroke="2" />
              </a>
            </div>
          </div>
        </Card>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { clamp } from 'lodash-es'
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { hexToHsv, hsvToHex } from '@/app/utils/color'
import { onClickOutside, useEventListener, useMouseInElement } from '@vueuse/core'
import { Card, Icon } from '@/components'

type ActiveElement = 'color' | 'hue' | null

export default defineComponent({
  setup(props, { emit }) {
    const activeElement = ref<ActiveElement>(null)
    const colorElement = ref<HTMLElement>()
    const colorSelectorX = ref(0)
    const colorSelectorY = ref(0)
    const container = ref<HTMLElement>()
    const hexElement = ref<HTMLElement>()
    const hexInput = ref('')
    const hueElement = ref<HTMLElement>()
    const hueSelector = ref(0)
    const isExpanded = ref(false)
    const isInvalid = ref(false)

    const {
      elementWidth: hueWidth,
      elementX: hueX,
    } = useMouseInElement(hueElement)

    const {
      elementHeight: colorHeight,
      elementWidth: colorWidth,
      elementX: colorX,
      elementY: colorY,
    } = useMouseInElement(colorElement)

    // cache the original value so we can discard changes
    let originalValue: string = ''

    onMounted(() => {
      originalValue = props.modelValue
    })

    // current value of the color picker
    const currentValue = computed(() => {
      return hsvToHex(hueSelector.value, colorSelectorX.value, 1 - colorSelectorY.value)
    })

    // discard the current value
    const discard = () => {
      emit('update:modelValue', originalValue)
      collapse()
    }

    // set the active element
    // this is used to determine if mousemove events should be
    // treated as drag-and-drop actions, and for which element
    const setActiveElement = (el: ActiveElement) => {
      activeElement.value = el
    }

    // sync drag-and-drop selector for the active element
    const syncSelectors = () => {
      const el = activeElement.value

      if (el === 'color') {
        colorSelectorX.value = clamp(colorX.value / colorWidth.value, 0, 1)
        colorSelectorY.value = clamp(colorY.value / colorHeight.value, 0, 1)
      } else if (el === 'hue') {
        hueSelector.value = clamp(hueX.value / hueWidth.value, 0, 1)
      }
    }

    // set the color picker to reflect a hex value
    const setFromHex = (val: string) => {
      try {
        const [h, s, v] = hexToHsv(val)
        colorSelectorX.value = s
        colorSelectorY.value = 1 - v
        hueSelector.value = h
        isInvalid.value = false
      } catch {
        isInvalid.value = true
      }
    }

    // collapse the color picker
    const collapse = () => {
      setActiveElement(null)
      isExpanded.value = false
    }

    // expand the color picker
    const expand = () => {
      if (props.disabled) {
        return
      }

      setFromHex(props.modelValue)
      isExpanded.value = true
      hexInput.value = currentValue.value
    }

    // update the v-model binding and close on foreign clicks
    onClickOutside(container, () => {
      if (isExpanded.value) {
        emit('update:modelValue', currentValue.value)
      }

      collapse()
    })

    // use escape / enter to cancel / submit
    useEventListener(document, 'keyup', (e) => {
      if (isExpanded.value) {
        if (e.key === 'Escape') {
          emit('update:modelValue', originalValue)
          collapse()
        } else if (e.key === 'Enter' && !isInvalid.value) {
          emit('update:modelValue', currentValue.value)
          collapse()
        }
      }
    })

    // update draggable items on mousemove
    useEventListener(document, 'mousemove', (e) => {
      if (e.buttons) {
        syncSelectors()
      }
    })

    // clear the active element when the mouse is released
    useEventListener(document, 'mouseup', () => {
      setActiveElement(null)
    })

    // manage body classes and sync selectors when the active element changes
    watch(activeElement, (el) => {
      document.body.classList[el ? 'add' : 'remove']('select-none')

      syncSelectors()
    })

    // update the hex input on color change
    watch(currentValue, () => {
      if (document.activeElement !== hexElement.value) {
        hexInput.value = currentValue.value
        isInvalid.value = false
      }
    })

    // update color on hex input change
    watch(hexInput, (value) => {
      if (document.activeElement === hexElement.value) {
        setFromHex(value)
      }
    })

    watch(currentValue, (value) => {
      emit('update:modelValue', value)
    })

    return {
      activeElement,
      collapse,
      colorElement,
      colorSelectorX,
      colorSelectorY,
      container,
      currentValue,
      discard,
      expand,
      isExpanded,
      hexElement,
      hexInput,
      hueElement,
      hueSelector,
      isInvalid,
      setActiveElement,
    }
  },
  components: {
    Card,
    Icon,
  },
  props: {
    disabled: {
      type: Boolean,
    },
    modelValue: {
      default: '#000000',
      type: String,
    },
  },
})
</script>

<style lang="scss" scoped>
[data-hue] {
  background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)
}

[data-saturation-white] {
  background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0))
}

[data-saturation-black] {
  background: linear-gradient(to top, #000, rgba(0, 0, 0, 0))
}
</style>