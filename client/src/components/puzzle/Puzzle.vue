<template>
  <Scene
    :camera-angle="cameraAngle"
    :camera-distance="cameraDistance"
    square>
    <AmbientLight />

    <component
      :config="normalizedConfig"
      :current-turn="currentTurn"
      :is="puzzle"
      :model="model"
      :turn-progress="turnProgress" />
  </Scene>
</template>

<script lang="ts">
import { AmbientLight, AxesHelper, BoxGeometry, Scene } from '@/three/components'
import { computed, defineComponent, PropType } from 'vue'
import { Cube } from '@bedard/twister';
import { isArray, isNumber } from 'lodash-es'
import CubeComponent from './cube/Cube.vue'

export default defineComponent({
  setup(props) {
    // scene props
    const cameraAngle = computed(() => {
      const cameraAngle = normalizedConfig.value.cameraAngle
      return isNumber(cameraAngle) ? cameraAngle : 25
    })

    const cameraDistance = computed(() => {
      const cameraDistance = normalizedConfig.value.cameraDistance
      return isNumber(cameraDistance) ? cameraDistance : 3
    })

    // configuration
    const normalizedConfig = computed(() => {
      const config = props.config // || userConfig.value(props.type);
      
      return {
        ...config,
        colors: (isArray(config?.colors) && props.masked)
          ? config?.colors.map(() => '#6B7280')
          : config?.colors,
      }
    })

    // puzzle component
    const puzzle = computed(() => {
      if (props.model instanceof Cube) return CubeComponent

      throw 'Puzzle not implemented'
    })

    return {
      cameraAngle,
      cameraDistance,
      normalizedConfig,
      puzzle,
    }
  },
  components: {
    AmbientLight,
    AxesHelper,
    BoxGeometry,
    Scene,
  },
  name: 'Puzzle',
  props: {
    config: {
      type: Object as PropType<Record<string, unknown>>,
    },
    currentTurn: {
      default: '',
      type: String,
    },
    masked: {
      default: false,
      type: Boolean,
    },
    model: {
      required: true,
      type: Object as PropType<Cube>,
    },
    turnProgress: {
      default: 0,
      type: Number,
    },
  }
})
</script>
