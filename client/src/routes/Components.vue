<template>
  <Input
    v-model="search"
    autofocus
    placeholder="Search components" />

  <div
    v-for="(example, index) in filteredExamples"
    class="border-b border-gray-300 py-6 dark:border-gray-700 last:border-b-0"
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
import { sortBy } from 'lodash-es'
import { useRoute, useRouter } from 'vue-router'

type Example = {
  component: Component
  header: string
}

const examples: Example[] = [
  {
    component: defineAsyncComponent(() => import('@/partials/components/ActionBarExample.vue')),
    header: '<ActionBar>',
  },
  {
    component: defineAsyncComponent(() => import('@/partials/components/ButtonExample.vue')),
    header: '<Button>',
  },
  {
    component: defineAsyncComponent(() => import('@/partials/components/CardExample.vue')),
    header: '<Card>',
  },
  {
    component: defineAsyncComponent(() => import('@/partials/components/CheckboxExample.vue')),
    header: '<Checkbox>',
  },
  {
    component: defineAsyncComponent(() => import('@/partials/components/ColorPickerExample.vue')),
    header: '<ColorPicker>',
  },
  {
    component: defineAsyncComponent(() => import('@/partials/components/IconExample.vue')),
    header: '<Icon>',
  },
  {
    component: defineAsyncComponent(() => import('@/partials/components/IconTextExample.vue')),
    header: '<IconText>',
  },
  {
    component: defineAsyncComponent(() => import('@/partials/components/ModalExample.vue')),
    header: '<Modal>',
  },
  {
    component: defineAsyncComponent(() => import('@/partials/components/PuzzleCubeExample.vue')),
    header: '<Puzzle> (cube)',
  },
  {
    component: defineAsyncComponent(() => import('@/partials/components/RangeInputExample.vue')),
    header: '<RangeInput>',
  },
  {
    component: defineAsyncComponent(() => import('@/partials/components/SpinnerExample.vue')),
    header: '<Spinner>',
  },
  {
    component: defineAsyncComponent(() => import('@/partials/components/UseCountdownExample.vue')),
    header: 'useCountdown',
  },
  {
    component: defineAsyncComponent(() => import('@/partials/components/UseTimerExample.vue')),
    header: 'useTimer',
  },
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
      const filter = search.value.toLowerCase()
  
      return sortBy(
        examples.filter(obj => obj.header.toLowerCase().includes(filter)),
        obj => obj.header
      )
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

