<template>
    <div class="flex flex-wrap md:flex-no-wrap">
        <div class="overflow-hidden w-full md:flex-1 md:w-auto">
            <pre>{{ $data }}</pre>
            <a href="#" @click.prevent="select('2x2')"> 2x2</a>
            <a href="#" @click.prevent="select('3x3')"> 3x3</a>
            <a href="#" @click.prevent="select('4x4')"> 4x4</a>
            <a href="#" @click.prevent="select('5x5')"> 5x5</a>
        </div>

        <div class="max-w-lg mx-auto w-full md:w-half">
            <div class="border pb-full relative">
                <v-scene
                    :camera-angle="90"
                    :camera-distance="1000">

                    <v-axes-helper :size="200" />

                    <v-light
                        type="ambient"
                        :color="0xffffff"
                        :intensity="0.5"
                    />

                    <v-light
                        type="point"
                        :color="0xffffff"
                        :intensity="0.7"
                        :position="{ x: 0, y: 2000, z: 2000 }"
                    />

                    <v-obj
                        v-for="(puzzle, index) in puzzles"
                        :key="index"
                        :rotation="rotation(index)"
                        :type="puzzle.type">
                        <v-obj :position="position(puzzle)">
                            <v-cube :type="puzzle.type" />
                        </v-obj>
                    </v-obj>
                </v-scene>
            </div>
        </div>
    </div>
</template>

<script>
import axesHelperComponent from '@/components/three/axes_helper/axes_helper.vue';
import boxComponent from '@/components/three/box/box.vue';
import cubeComponent from '@/components/puzzle/cube/cube.vue';
import lightComponent from '@/components/three/light/light.vue';
import objComponent from '@/components/three/obj/obj.vue';
import sceneComponent from '@/components/three/scene/scene.vue';
import { componentRafEase } from '@/app/utils/component';
import { easeInOutCubic } from '@/app/constants';
import { noop } from 'lodash-es';

export default {
    data() {
        return {
            puzzles: [
                {
                    cancelSelection: noop,
                    selectionProgress: 0,
                    type: '2x2',
                },
                {
                    cancelSelection: noop,
                    selectionProgress: 0,
                    type: '3x3',
                },
                {
                    cancelSelection: noop,
                    selectionProgress: 0,
                    type: '4x4',
                },
                {
                    cancelSelection: noop,
                    selectionProgress: 0,
                    type: '5x5',
                },
            ],
            selected: null,
        };
    },
    components: {
        'v-axes-helper': axesHelperComponent,
        'v-light': lightComponent,
        'v-scene': sceneComponent,
        'v-box': boxComponent,
        'v-obj': objComponent,
        'v-cube': cubeComponent,
    },
    computed: {
        position() {
            return puzzle => {
                return {
                    x: 400 * (1 - puzzle.selectionProgress),
                    z: 600 * (puzzle.selectionProgress),
                };
            };
        },
        rotation() {
            return index => {
                return {
                    z: (360 / this.puzzles.length) * index,
                }
            };
        },
    },
    methods: {
        select(puzzleType) {
            this.selected = puzzleType;
        },
    },
    watch: {
        selected(selected, prevSelected) {
            const speed = 1000;

            // select the desired puzzle
            const selectedPuzzle = this.puzzles.find(puzzle => puzzle.type === selected);

            if (selectedPuzzle) {
                selectedPuzzle.cancelSelection();

                const easing = componentRafEase(this, (progress) => {
                    selectedPuzzle.selectionProgress = progress;
                }, speed, easeInOutCubic);

                selectedPuzzle.cancelSelection = easing.cancel;
            }

            // de-select the previous puzzle
            const prevSelectedPuzzle = this.puzzles.find(puzzle => puzzle.type === prevSelected);

            if (prevSelectedPuzzle) {
                prevSelectedPuzzle.cancelSelection();

                const startingProgress = prevSelectedPuzzle.selectionProgress;
                
                const easing = componentRafEase(this, (progress) => {
                    prevSelectedPuzzle.selectionProgress = startingProgress * (1 - progress);
                }, speed, easeInOutCubic);

                prevSelectedPuzzle.cancelSelection = easing.cancel;
            }
        },
    },
};
</script>
