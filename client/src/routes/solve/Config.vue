<template>
  Customize appearance

  <pre>{{ fields }}</pre>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { isCube } from '@/app/utils'
import { useRoute } from 'vue-router'

type FieldType<T extends string, U extends object> = {
  options: U
  type: T
}

type ColorsField = FieldType<'colors', {
  count: number
}>

type NumberField = FieldType<'number', {
  max: number
  min: number
  step: number
}>

type ConfigForm = Array<{
  label: string
  span: string
} & (
  ColorsField | NumberField
)>

// cube
const cubeConfigForm: ConfigForm = [
  {
    label: 'Colors',
    options: {
      count: 6,
    },
    span: 'col-span-12',
    type: 'colors',
  },
  {
    label: 'Camera angle',
    options: {
      max: 90,
      min: 0,
      step: 0.1,
    },
    span: 'md:col-span-4',
    type: 'number',
  },
  {
    label: 'Camera distance',
    options: {
      max: 3,
      min: 0,
      step: 0.1,
    },
    span: 'md:col-span-4',
    type: 'number',
  },
]

export default defineComponent({
  setup() {
    const route = useRoute()

    const fields = computed(() => {
      const puzzle = route.params?.puzzle as string

      if (isCube(puzzle)) {
        return cubeConfigForm
      }

      return []
    })

    return {
      fields
    }
  },
  name: 'Config',
})
</script>
