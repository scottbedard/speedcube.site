<template>
  <teleport to="body">
    <div
      class="bg-darken-50 fixed flex h-full items-center justify-center left-0 overflow-y-auto top-0 w-full z-10 focus:outline-none"
      ref="container"
      role="dialog"
      tabindex="-1"
      @click="close">
      <div class="p-6 w-full">
        <div
          :class="['mx-auto', sizeClass]"
          @click.stop>
          <Card :padded="padded">
            <slot />
          </Card>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { createFocusTrap, FocusTrap } from 'focus-trap'
import { computed, defineComponent, onBeforeUnmount, onMounted, PropType, ref } from 'vue'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { useEventListener } from '@vueuse/core'
import Card from './Card.vue'

export default defineComponent({
  setup(props, { emit }) {
    let trap: FocusTrap | undefined

    const container = ref<HTMLElement>()

    // size class
    const sizeClass = computed(() => {
      if (props.size === 'sm') return 'max-w-sm'
      if (props.size === 'md') return 'max-w-md'
      if (props.size === 'lg') return 'max-w-lg'
      if (props.size === 'xl') return 'max-w-xl'
      return 'max-w-2xl'
    })

    // emit close events
    const close = () => emit('close')
    
    useEventListener(document, 'keyup', (e) => {
      if (e.key === 'Escape') close()
    })

    // disable background scrolling, and trap focus within the modal
    onMounted(() => {
      disableBodyScroll(container.value as HTMLElement, {
        reserveScrollBarGap: true,
      })

      trap = createFocusTrap(container.value as HTMLElement)
      trap.activate()
    });

    // clean up body scrolling and focus traps
    onBeforeUnmount(() => {
      enableBodyScroll(container.value as HTMLElement)

      if (trap) {
        trap.deactivate()
      }
    });

    return {
      close,
      container,
      sizeClass,
    };
  },
  components: {
    Card,
  },
  emits: [
    'close',
  ],
  props: {
    padded: {
      default: false,
      type: Boolean,
    },
    size: {
      default: '2xl',
      type: String as PropType<'sm'|'md'|'lg'|'xl'|'2xl'>,
    },
  },
})
</script>
