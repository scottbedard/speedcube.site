<template>
  <v-button @click="show">Show modal</v-button>

  <v-modal
    v-if="isVisible"
    padded
    @dismiss="hide">
    <h3 class="mb-4 text-3xl">
      Be aware of the focus behavior
    </h3>

    <p class="mb-6">
      Modals auto focus their first eligible element, and trap focus within the
      them. When closed, focus is returned to the element that previously had it.
    </p>

    <div class="gap-6 grid sm:grid-cols-2"> 
      <div>
        <v-input placeholder="First input" />
      </div>
      <div>
        <v-input placeholder="Second input" />
      </div>
      <div class="flex  justify-end sm:col-span-2">
        <v-button @click="hide">Close</v-button>
      </div>
    </div>
  </v-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VButton from '@/components/button.vue';
import VInput from '@/components/input.vue';
import VModal from '@/components/modal.vue';

export default defineComponent({
  data() {
    return {
      isVisible: false,
    };
  },
  components: {
    VButton,
    VInput,
    VModal,
  },
  methods: {
    hide() {
      this.isVisible = false;
    },
    show() {
      this.isVisible = true;
    },
  },
});
</script>
