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
/* eslint-disable */
import { Cube } from '@bedard/twister';
import { stubObject } from 'lodash-es';
import { defineComponent, ref } from '@vue/composition-api';
import { getCubeSize, isCube } from '@/app/utils/puzzle';
import { useAmbientLight } from '@/app/three/lights/useAmbientLight';
import { useAxesHelper } from '@/app/three/utils/useAxesHelper';
import { useCubePuzzle } from '@/app/three/puzzles/useCubePuzzle';
import { useGroup } from '@/app/three/utils/useGroup';
import { usePointLight } from '@/app/three/lights/usePointLight';
import { PossiblyReactive } from '@/app/three/types';
import Scene from '@/components/three/Scene.vue';
import { PuzzleApi } from './types';

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
    const animateCurrentTurn = ref<string|null>(null);
    const animateTurnProgress = ref<number>(0);
    const model = createModel(props.type);
    const puzzle = createPuzzle(props, model);

    const api: PuzzleApi = {
      apply() {
        // set puzzle state
      },
      turn(alg: string) {
        console.log('applying', alg);
      },
      reset() {
        // apply initial state
      },
    };

    emit('ready', api);

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
      type: String,
    },
    options: {
      default: stubObject,
      type: Object,
    },
    turnProgress: {
      type: Number,
    },
    type: {
      default: '3x3',
      type: String,
    },
  },
});
</script>
