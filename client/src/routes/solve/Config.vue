<template>
  <form
    class="gap-6 grid max-w-4xl mx-auto"
    @submit.prevent="submit">
    <div class="gap-6 grid grid-cols-12">
      <div
        v-for="(field, index) in fields"
        class="col-span-12"
        :class="field.span"
        :key="index">
        <!-- colors -->
        <div
          v-if="field.type === 'colors'">
          <Label
            class="mb-1"
            :text="field.label" />

          <div class="gap-3 flex flex-wrap">
            <ColorPicker
              v-for="n in field.options.count"
              :key="n" />
          </div>
        </div>

        <!-- number -->
        <RangeInput
          v-else-if="field.type === 'number'"
          :label="field.label"
          :max="field.options.max"
          :min="field.options.min"
          :step="field.options.step" />
      </div>
    </div>

    <div class="gap-6 flex items-center justify-end">
      <RouterLink
        :to="{
          name: 'solve',
          params: {
            puzzle: route.params.puzzle
          }
        }">
        Cancel
      </RouterLink>

      <Button primary type="submit">
        Save
      </Button>
    </div>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { isCube } from '@/app/utils'
import { Button, ColorPicker, Label, RangeInput } from '@/components'
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
  span?: string
} & (
  ColorsField | NumberField
)>

//
// cube
//
const cubeConfigForm: ConfigForm = [
  {
    label: 'Colors',
    options: {
      count: 6,
    },
    type: 'colors',
  },
  {
    label: 'Camera angle',
    options: {
      max: 90,
      min: 0,
      step: 0.01,
    },
    span: 'xs:col-span-6 md:col-span-4',
    type: 'number',
  },
  {
    label: 'Camera distance',
    options: {
      max: 3,
      min: 0,
      step: 0.01,
    },
    span: 'xs:col-span-6 md:col-span-4',
    type: 'number',
  },
  {
    label: 'Turn duration',
    options: {
      max: 500,
      min: 40,
      step: 1,
    },
    span: 'xs:col-span-6 md:col-span-4',
    type: 'number',
  },
  {
    label: 'Sticker spacing',
    options: {
      max: 1,
      min: 0,
      step: 0.01,
    },
    span: 'xs:col-span-6 md:col-span-4',
    type: 'number',
  },
  {
    label: 'Sticker elevation',
    options: {
      max: 1,
      min: 0,
      step: 0.01,
    },
    span: 'xs:col-span-6 md:col-span-4',
    type: 'number',
  },
  {
    label: 'Sticker radius',
    options: {
      max: 1,
      min: 0,
      step: 0.01,
    },
    span: 'xs:col-span-6 md:col-span-4',
    type: 'number',
  },
  {
    label: 'Inner brightness',
    options: {
      max: 1,
      min: 0,
      step: 0.01,
    },
    span: 'xs:col-span-6 md:col-span-4',
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

    const submit = () => {
      console.log('submit')
    }

    return {
      fields,
      route,
      submit,
    }
  },
  components: {
    Button,
    ColorPicker,
    Label,
    RangeInput,
  },
  name: 'Config',
})
</script>
