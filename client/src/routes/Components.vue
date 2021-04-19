<template>
  <div
    v-for="(example, index) in examples"
    :key="index">
    <h2 class="font-bold font-mono mb-6 text-lg">
      <RouterLink
        v-text="example.header"
        :to="{
          name: 'components',
          query: {
            filter: example.header,
          }
        }" />
    </h2>
    <component
      :is="example.component" />
  </div>
</template>

<script lang="ts">
import { Component, defineAsyncComponent, defineComponent } from 'vue'

type Example = {
  component: Component
  header: string
}

const examples: Example[] = [
  {
    component: defineAsyncComponent(() => import('@/partials/components/ButtonExample.vue')),
    header: '<button>',
  }
]

export default defineComponent({
  setup() {
    return {
      examples,
    }
  },
})
</script>

