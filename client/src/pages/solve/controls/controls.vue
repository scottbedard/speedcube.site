<template>
  <!-- info -->
  <p class="leading-loose max-w-xl mb-6 mx-auto text-center">
    These are your current key bindings, displayed in <strong class="inline-flex items-center">
    &quot;key &bull; turn&quot;</strong> format. Pressing a key will highlight the associated binding.
  </p>

  <!-- actions -->
  <div class="gap-x-12 flex flex-wrap justify-center leading-loose tracking-wide sm:justify-start">
    <a class="inline-flex items-center" href="#" @click.prevent="showModal('add')">
      <v-icon class="mr-2" name="plus" size="5" stroke="4" /> Add Binding
    </a>
    <a class="inline-flex items-center" href="#" @click.prevent>
      <v-icon class="mr-2" name="hash" size="5" stroke="3" /> Add Keyspace
    </a>
    <a class="inline-flex items-center" href="#" @click.prevent>
      <v-icon class="mr-2" name="code" size="5" stroke="3" /> Edit JSON
    </a>
    <a class="inline-flex items-center" href="#" @click.prevent>
      <v-icon class="mr-2" name="rotate-ccw" size="5" stroke="3" /> Reset Default
    </a>
    <a class="inline-flex items-center" href="#" @click.prevent>
      <v-icon class="mr-2" name="trash-2" size="5" stroke="3" /> Clear All
    </a>
  </div>

  <!-- modals -->
  <v-add-keybinding-modal
    v-if="isActiveModal('add')"
    @dismiss="closeModal" />

  <!-- keyspace -->

  <!-- footer -->
  <div class="flex justify-end">
    <v-button disabled>Save</v-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import VAddKeybindingModal from '@/partials/solve/add-keybinding-modal.vue';
import VButton from '@/components/button.vue';
import VIcon from '@/components/icon.vue';

export default defineComponent({
  setup() {
    const activeModal = ref<string>('');

    const closeModal = () => activeModal.value = '';
    const isActiveModal = (value: string) => activeModal.value === value
    const showModal = (value: string) => { activeModal.value = value }

    return {
      closeModal,
      isActiveModal,
      showModal,
    };
  },
  components: {
    VAddKeybindingModal,
    VButton,
    VIcon,
  },
});
</script>
