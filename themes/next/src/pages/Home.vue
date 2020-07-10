<template>
  <div>
    <div class="max-w-md mx-auto">
      <Puzzle
        type="3x3"
        :camera-angle="cameraAngle"
        :camera-distance="cameraDistance"
        :current-turn="currentTurn"
        :options="options"
        :turn-progress="turnProgress"
        @ready="onPuzzleReady"
      />

      <div class="flex">
        <div class="flex-1 mt-4">
          <label class="block mb-4">
            <div>Camera Angle: {{ cameraAngle }}</div>
            <input v-model.number="cameraAngle" min="0" max="90" type="range" />
          </label>
          <label class="block mb-4">
            <div>Camera Distance: {{ cameraDistance }}</div>
            <input v-model.number="cameraDistance" min="0" max="20" step="0.01" type="range" />
          </label>
          <label class="block mb-4">
            <div>Current Turn: {{ currentTurn }}</div>
            <input v-model="currentTurn" class="text-black" />
          </label>
          <label class="block mb-4">
            <div>Inner brightness: {{ options.innerBrightness }}</div>
            <input v-model.number="options.innerBrightness" min="0" max="1" step="0.01" type="range" />
          </label>
          <label class="block mb-4">
            <div>Sticker Radius: {{ options.stickerRadius }}</div>
            <input v-model.number="options.stickerRadius" min="0" max="1" step="0.01" type="range" />
          </label>
          <label class="block mb-4">
            <div>Sticker Elevation: {{ options.stickerElevation }}</div>
            <input v-model.number="options.stickerElevation" min="0" max="1" step="0.01" type="range" />
          </label>
          <label class="block mb-4">
            <div>Sticker Spacing: {{ options.stickerSpacing }}</div>
            <input v-model.number="options.stickerSpacing" min="0" max="1" step="0.01" type="range" />
          </label>
          <label class="block mb-4">
            <div>Turn progress: {{ turnProgress }}</div>
            <input v-model.number="turnProgress" min="0" max="1" step="0.01" type="range" />
          </label>
          <label class="block mb-4">
            <div>Position: <span class="font-mono">{{ position }}</span></div>
            <div class="flex">
              <input v-model.number="position.x" min="-10" max="10" step="0.01" type="range" />
              <input v-model.number="position.y" min="-10" max="10" step="0.01" type="range" />
              <input v-model.number="position.z" min="-10" max="10" step="0.01" type="range" />
            </div>
          </label>
          <label class="block mb-4">
            <div>Hidden: <span class="font-mono">{{ hidden }}</span></div>
            <div class="flex">
              <input v-model="hidden" type="checkbox" />
            </div>
          </label>
        </div>
        <pre class="flex-1 text-xs">{{ options }}</pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { reactive, ref } from '@vue/composition-api';
import Scene from '@/components/three/Scene.vue';
import Puzzle from '@/components/puzzle/Puzzle.vue';
import { useAmbientLight } from '@/app/three/lights/useAmbientLight';
import { usePointLight } from '@/app/three/lights/usePointLight';
import { useAxesHelper } from '@/app/three/utils/useAxesHelper';
import { useBox } from '@/app/three/geometries/useBox';
import { useCubePuzzle } from '@/app/three/puzzles/useCubePuzzle';
import { useGroup } from '@/app/three/utils/useGroup';
import { Cube } from '@bedard/twister';
import { createNoopPuzzle } from '@/app/utils/puzzle';
import { PuzzleApi } from '../components/puzzle/types';

export default {
  setup() {
    let puzzle: PuzzleApi = createNoopPuzzle();

    const cameraAngle = ref(35);
    const cameraDistance = ref(3);
    const currentTurn = ref('R');
    const debug = true;
    const hidden = ref(false);
    const position = ref({ x: 0, y: 0, z: 0 });

    const turnProgress = ref(0.2);

    const options = reactive({
      colors: [
        0xff0000,
        0xff00ff,
        0x00ffff,
        0xffff00,
        0xffffff,
        0x0000ff,
      ],
      innerBrightness: 0.5,
      stickerElevation: 0.2,
      stickerRadius: 0.2,
      stickerSpacing: 0.2,
    });

    const onPuzzleReady = (puzzleApi: PuzzleApi) => {
      puzzle = puzzleApi

      console.log('its ready!');
    }

    return {
      cameraAngle,
      cameraDistance,
      currentTurn,
      hidden,
      onPuzzleReady,
      options,
      position,
      turnProgress,
    };
  },
  components: {
    Puzzle,
    Scene,
  },
};
</script>
