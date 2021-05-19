<template>
  <form
    class="gap-6 grid max-w-4xl mx-auto"
    @submit.prevent="submit">
    <div
      v-if="previewPuzzleConfig"
      class="gap-6 grid grid-cols-12">
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
              v-model="previewPuzzleConfig[field.key][n - 1]"
              :disabled="loading"
              :key="n" />
          </div>
        </div>

        <!-- number -->
        <RangeInput
          v-else-if="field.type === 'number'"
          v-model="previewPuzzleConfig[field.key]"
          :disabled="loading"
          :label="field.label"
          :max="field.options.max"
          :min="field.options.min"
          :step="field.options.step" />
      </div>
    </div>

    <div
      v-if="isAuthenticated"
      class="gap-6 flex items-center justify-end">
      <RouterLink
        :to="{
          name: 'solve',
          params: {
            puzzle: route.params.puzzle
          }
        }">
        Cancel
      </RouterLink>

      <Button
        primary
        type="submit"
        :disabled="loading"
        :loading="loading">
        Save
      </Button>
    </div>

    <div
      v-else
      class="flex flex-wrap gap-6 items-center justify-between">
      <IconText name="alert-octagon">
        You must be signed in to save puzzle settings.
      </IconText>

      <div class="flex flex-wrap gap-6 items-center justify-center w-full xs:justify-end lg:w-auto">
        <RouterLink
          :to="{
            name: 'login',
            query: {
              returnTo: route.fullPath,
            }
          }">
          Login
        </RouterLink>

        <Button
          class="w-full xs:w-auto"
          primary
          :to="{ name: 'create-account' }">
          Create account
        </Button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { alert } from '@/app/alerts'
import { Button, ColorPicker, IconText, Label, RangeInput } from '@/components'
import { computed, defineComponent, onMounted, onUnmounted } from 'vue'
import { isAuthenticated, puzzleConfig } from '@/app/store/computed'
import { isCube } from '@/app/utils'
import { previewPuzzleConfig } from '@/app/store/state'
import { usePuzzleConfig } from '@/app/api'
import { useRoute, useRouter } from 'vue-router'

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
  key: string
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
    key: 'colors',
    label: 'Colors',
    options: {
      count: 6,
    },
    type: 'colors',
  },
  {
    key: 'cameraAngle',
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
    key: 'cameraDistance',
    label: 'Camera distance',
    options: {
      max: 5,
      min: 0,
      step: 0.01,
    },
    span: 'xs:col-span-6 md:col-span-4',
    type: 'number',
  },
  {
    key: 'turnDuration',
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
    key: 'stickerSpacing',
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
    key: 'stickerElevation',
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
    key: 'stickerRadius',
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
    key: 'innerBrightness',
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
    const router = useRouter()
    const puzzle = route.params?.puzzle as string

    const fields = computed(() => {
      if (isCube(puzzle)) {
        return cubeConfigForm
      }

      return []
    })

    const {
      loading,
      save,
    } = usePuzzleConfig(puzzle)

    const submit = () => {
      save().then(() => {
        // success
        alert({
          text: 'Puzzle configuration saved',
          type: 'success',
        })

        router.push({
          name: 'solve',
          params: { puzzle },
        })
      }, () => {
        // failed
        alert({
          text: 'An unknown error occured, please try again',
          type: 'failed',
        })
      })
    }

    // mounted
    onMounted(() => {
      const config = puzzleConfig.value(puzzle)
      
      previewPuzzleConfig.value = config
    })

    // unmounted
    onUnmounted(() => {
      previewPuzzleConfig.value = null
    })

    return {
      fields,
      isAuthenticated,
      loading,
      previewPuzzleConfig: previewPuzzleConfig as any,
      route,
      submit,
    }
  },
  components: {
    Button,
    ColorPicker,
    IconText,
    Label,
    RangeInput,
  },
  name: 'Config',
})
</script>
