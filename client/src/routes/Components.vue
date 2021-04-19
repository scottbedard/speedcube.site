<template>
  <Input
    v-model="search"
    autofocus
    class="mb-6"
    placeholder="Search components" />

  <div
    v-for="(example, index) in filteredExamples"
    :key="index">
    <h2 class="font-bold font-mono mb-4 text-lg">
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
import { Component, computed, defineAsyncComponent, defineComponent } from 'vue'
import { Input } from '@/components'
import { useRoute, useRouter } from 'vue-router'

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
    const route = useRoute()

    const router = useRouter()

    const search = computed({
      get() {
        return String(route.query.filter ?? '')
      },
      set(value: string) {
        router.replace({
          name: 'components',
          query: value
            ? { filter: value }
            : {}
        })
      }
    })

    const filteredExamples = computed(() => {
      return examples.filter(obj => obj.header.includes(search.value))
    })

    return {
      filteredExamples,
      search,
    }
  },
  components: {
    Input
  }
})
</script>

