<template>
  <div class="gap-6 grid max-w-4xl md:grid-cols-2">
    <div class="max-w-md mx-auto w-full">
      <Puzzle
        class="border-4 border-dashed border-gray-300 dark:border-gray-700"
        :config="config"
        :current-turn="currentTurn"
        :key="size"
        :masked="masked"
        :model="model"
        :turn-progress="turnProgress" />
    </div>
    <div>
      <div class="gap-6 grid xs:grid-cols-2">
        <RangeInput
          v-model="size"
          class="md:col-span-2"
          label="Puzzle size"
          :max="10"
          :min="2" />
        
        <Input
          v-model="currentTurn"
          label="Current turn" />

        <RangeInput
          v-model="turnProgress"
          label="turnProgress"
          :max="1"
          :min="0"
          :step="0.01" />

        <RangeInput
          v-model="config.cameraAngle"
          label="cameraAngle"
          :max="90"
          :min="0"
          :step="0.01" />

        <RangeInput
          v-model="config.cameraDistance"
          label="cameraDistance"
          :max="10"
          :min="0"
          :step="0.01" />

        <RangeInput
          v-model="config.innerBrightness"
          label="innerBrightness"
          :max="1"
          :min="0"
          :step="0.01" />

        <RangeInput
          v-model="config.stickerElevation"
          label="stickerElevation"
          :max="1"
          :min="0"
          :step="0.01" />

        <RangeInput
          v-model="config.stickerRadius"
          label="stickerRadius"
          :max="1"
          :min="0"
          :step="0.01" />

        <RangeInput
          v-model="config.stickerSpacing"
          label="stickerSpacing"
          :max="1"
          :min="0"
          :step="0.01" />

        <Checkbox v-model="masked">
          Masked
        </Checkbox>
      </div>

      <pre class="mt-6 text-xs">{{ config }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import { colors } from '@/app/utils'
import { computed, defineComponent, ref, watch } from 'vue'
import { Cube } from '@bedard/twister'
import { cubeConfig } from '@/components/puzzle/constants'
import { Checkbox, Input, Puzzle, RangeInput } from '@/components'
import { useRoute, useRouter } from 'vue-router'

const defaultCurrentTurn = ''
const defaultSize = 3
const defaultTurnProgress = 0

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    const masked = ref(Boolean(route.query.masked))
    const size = ref(route.query.size ? Number(route.query.size) : defaultSize)
    const model = computed(() => new Cube({ size: size.value }))
    const currentTurn = ref(route.query.currentTurn as string ?? defaultCurrentTurn)
    const turnProgress = ref(route.query.turnProgress ? Number(route.query.turnProgress) : defaultTurnProgress)

    const config = ref({
      cameraAngle: route.query.cameraAngle ? Number(route.query.cameraAngle) : cubeConfig.cameraAngle,
      cameraDistance: route.query.cameraDistance ? Number(route.query.cameraDistance) : cubeConfig.cameraDistance,
      colors: [
        colors.yellow, // U
        colors.orange, // L
        colors.blue, // F
        colors.red, // R
        colors.green, // B
        colors.white, // D
      ],
      innerBrightness: route.query.innerBrightness ? Number(route.query.innerBrightness) : cubeConfig.innerBrightness,
      stickerElevation: route.query.stickerElevation ? Number(route.query.stickerElevation) : cubeConfig.stickerElevation,
      stickerRadius: route.query.stickerRadius ? Number(route.query.stickerRadius) : cubeConfig.stickerRadius,
      stickerSpacing: route.query.stickerSpacing ? Number(route.query.stickerSpacing) : cubeConfig.stickerSpacing,
      turnDuration: 65,
    })

    let ignoreRouteChange = false;

    watch([config, currentTurn, masked, size, turnProgress], () => {
      ignoreRouteChange = true

      router.replace({
        name: route.name!,
        query: {
          cameraAngle: config.value.cameraAngle != cubeConfig.cameraAngle ? config.value.cameraAngle : undefined,
          cameraDistance: config.value.cameraDistance != cubeConfig.cameraDistance ? config.value.cameraDistance : undefined,
          currentTurn: currentTurn.value != defaultCurrentTurn ? currentTurn.value : undefined,
          filter: route.query.filter,
          innerBrightness: config.value.innerBrightness != cubeConfig.innerBrightness ? config.value.innerBrightness : undefined,
          masked: masked.value ? 1 : undefined,
          size: size.value != defaultSize ? size.value : undefined,
          stickerElevation: config.value.stickerElevation != cubeConfig.stickerElevation ? config.value.stickerElevation : undefined,
          stickerRadius: config.value.stickerRadius != cubeConfig.stickerRadius ? config.value.stickerRadius : undefined,
          stickerSpacing: config.value.stickerSpacing != cubeConfig.stickerSpacing ? config.value.stickerSpacing : undefined,
          turnProgress: turnProgress.value != defaultTurnProgress ? turnProgress.value : undefined,
        },
      })
    }, { deep: true })

    watch(() => route.query, () => {
      if (ignoreRouteChange) {
        ignoreRouteChange = false
        return
      }
      
      config.value.cameraAngle = route.query.cameraAngle ? Number(route.query.cameraAngle) : cubeConfig.cameraAngle
      config.value.cameraDistance = route.query.cameraDistance ? Number(route.query.cameraDistance) : cubeConfig.cameraDistance
      config.value.innerBrightness = route.query.innerBrightness ? Number(route.query.innerBrightness) : cubeConfig.innerBrightness
      config.value.stickerElevation = route.query.stickerElevation ? Number(route.query.stickerElevation) : cubeConfig.stickerElevation
      config.value.stickerRadius = route.query.stickerRadius ? Number(route.query.stickerRadius) : cubeConfig.stickerRadius
      config.value.stickerSpacing = route.query.stickerSpacing ? Number(route.query.stickerSpacing) : cubeConfig.stickerSpacing
      currentTurn.value = route.query.currentTurn as string ?? defaultCurrentTurn
      masked.value = Boolean(route.query.masked)
      size.value = route.query.size ? Number(route.query.size) : defaultSize
      turnProgress.value = route.query.turnProgress ? Number(route.query.turnProgress) : defaultTurnProgress
    })

    return {
      config,
      currentTurn,
      masked,
      model,
      size,
      turnProgress,
    }
  },
  components: {
    Checkbox,
    Input,
    Puzzle,
    RangeInput,
  },
  name: 'PuzzleCubeExample',
})
</script>
