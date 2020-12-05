<template>
  <v-button
    icon="plus"
    :disabled="disabled"
    :loading="loading"
    @click="onClick">
    Click me
  </v-button>

  <div class="flex flex-wrap gap-6 mt-6">
    <v-checkbox v-model="disabled">Disabled</v-checkbox>
    <v-checkbox v-model="loading">Loading</v-checkbox>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VButton from '@/components/button.vue';
import VCheckbox from '@/components/checkbox.vue';

export default defineComponent({
  data() {
    return {
      disabled: false,
      loading: false,
    };
  },
  components: {
    VButton,
    VCheckbox,
  },
  methods: {
    onClick() {
      alert('Hello 👋');
    },
  },
});
</script>