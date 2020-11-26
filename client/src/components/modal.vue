<template>
  <teleport to="body">
    <div
      class="bg-alpha-50 fixed grid h-full items-center left-0 overflow-y-auto top-0 w-full z-10 focus:outline-none"
      ref="container"
      role="dialog"
      tabindex="-1"
      @click="dismiss">
      <div class="p-8">
        <v-card class="max-w-2xl mx-auto" :padded="padded">
          <slot />
        </v-card>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { createFocusTrap, FocusTrap } from 'focus-trap';
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useEventListener } from '@vueuse/core'
import VCard from '@/components/card.vue';

export default defineComponent({
  setup(props, { emit }) {
    let trap: FocusTrap | undefined;

    const container = ref<HTMLElement>();

    // listen for dismiss events
    const dismiss = () => emit('dismiss');
    
    useEventListener(document, 'keyup', (e) => {
      if (e.key === 'Escape') dismiss();
    });

    // disable background scrolling, and trap focus within the modal
    onMounted(() => {
      disableBodyScroll(container.value as HTMLElement, {
        reserveScrollBarGap: true,
      });

      trap = createFocusTrap(container.value as HTMLElement);
      trap.activate();
    });

    // clean up body scrolling and focus traps
    onBeforeUnmount(() => {
      enableBodyScroll(container.value as HTMLElement);

      if (trap) {
        trap.deactivate();
      }
    });

    return {
      container,
      dismiss,
    };
  },
  components: {
    VCard,
  },
  emits: [
    'dismiss',
  ],
  props: {
    padded: {
      default: false,
      type: Boolean,
    },
  },
});
</script>
