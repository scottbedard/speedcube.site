<template>
  <v-button @click="onClick">
    <input
      class="hidden"
      ref="input"
      type="file"
      :accept="accept"
      @change="onChange" />
    <slot />
  </v-button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import VButton from '@/components/button.vue';

export default defineComponent({
  setup(props, { emit }) {
    const input = ref<HTMLInputElement>();

    const onChange = () => {
      if (input.value) {
        emit('change', input.value.files?.[0]);
      }
    }

    const onClick = (e: Event) => {
      if (input.value) {
        input.value.click();
      }

      emit('click', e);
    }

    return {
      input,
      onChange,
      onClick,
    };
  },
  components: {
    VButton,
  },
  emits: [
    'change',
    'click',
  ],
  props: {
    accept: {
      required: true,
      type: String,
    },
  },
});
</script>
