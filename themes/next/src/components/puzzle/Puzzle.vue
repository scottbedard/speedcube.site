<template>
  <div>
    <Scene
      :camera-angle="cameraAngle"
      :camera-distance="cameraDistance"
      :children="children">
      <div class="pb-full" />
    </Scene>
  </div>
</template>

<script lang="ts">
import { Cube } from '@bedard/twister';
import { stubObject } from 'lodash-es';
import { computed, defineComponent, watch } from '@vue/composition-api';
import { getCubeSize, isCube } from '@/app/utils/puzzle';
import { useAmbientLight } from '@/app/three/lights/useAmbientLight';
import { useAxesHelper } from '@/app/three/utils/useAxesHelper';
import { useCubePuzzle } from '@/app/three/puzzles/useCubePuzzle';
import { useGroup } from '@/app/three/utils/useGroup';
import { usePointLight } from '@/app/three/lights/usePointLight';
import { PossiblyReactive } from '@/app/three/types';
import Scene from '@/components/three/Scene.vue';

type Props = {
  cameraAngle: PossiblyReactive<number>;
  cameraDistance: PossiblyReactive<number>;
  currentTurn: PossiblyReactive<string>;
  debug: boolean;
  options: PossiblyReactive<object>;
  turnProgress: PossiblyReactive<number>;
  type: string;
}

/**
 * Create a model.
 */
function createModel(type: string): Cube {
  if (isCube(type)) {
    const size = getCubeSize(type);

    return new Cube({ size });
  }

  throw new Error(`${type} model not implemented`);
}

/**
 * Create puzzle.
 */
function createPuzzle(props: Props, model: Cube) {
  if (isCube(props.type)) {
    return useCubePuzzle(props);
  }

  throw new Error(`${props.type} puzzle not implemented`);
}

export default defineComponent({
  setup(props: Props, { emit }) {
    const currentTurn = computed(() => props.currentTurn);
    const turnProgress = computed(() => props.turnProgress);
    const model = createModel(props.type);
    const puzzle = createPuzzle(props, model);

    const children = useGroup({}, [
      useAxesHelper(),
      useAmbientLight({
        color: 0xffffff,
        intensity: 0.5,
      }),
      usePointLight({
        color: 0xffffff,
        intensity: 0.7,
        position: {
          x: 0,
          y: 2000,
          z: 2000,
        },
      }),
      puzzle,
    ]);

    return {
      children,
    };
  },
  components: {
    Scene,
  },
  props: {
    cameraAngle: {
      default: 40,
      type: Number,
    },
    cameraDistance: {
      default: 3,
      type: Number,
    },
    currentTurn: {
      default: null,
      type: String,
    },
    options: {
      default: stubObject,
      type: Object,
    },
    turnProgress: {
      default: 0,
      type: Number,
    },
    type: {
      default: '3x3',
      type: String,
    },
  },
});
</script>
