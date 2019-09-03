<template>
    <div class="flex flex-wrap md:flex-no-wrap">
        <div class="overflow-hidden w-full md:flex-1 md:w-auto">
            <a href="#" @click.prevent="select('2x2')"> 2x2</a>
            <a href="#" @click.prevent="select('3x3')"> 3x3</a>
            <a href="#" @click.prevent="select('4x4')"> 4x4</a>
            <a href="#" @click.prevent="select('5x5')"> 5x5</a>
        </div>

        <div class="max-w-xl mx-auto w-full md:w-half">
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

                    <v-obj :rotation="{ z: orbitRotation }">
                        <v-obj
                            v-for="(puzzle, index) in puzzles"
                            :key="index"
                            :rotation="rotation(index)"
                            :type="puzzle.type">
                            <v-obj :position="position(puzzle)" :rotation="puzzle.rotation">
                                <v-cube :type="puzzle.type" />
                            </v-obj>
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
import { componentInterval } from 'spyfu-vue-utils';
import { componentRafEase } from '@/app/utils/component';
import { easeOutQuart as easeInCurve, easeOutQuart as easeOutCurve } from '@/app/constants';
import { noop, random } from 'lodash-es';

function randomRotation() {
    return {
        x: random(0, 365),
        y: random(0, 365),
        z: random(0, 365),
    };
}

export default {
    created() {
        componentInterval(this, () => {
            this.orbitRotation += 0.2;

            this.puzzles.forEach(puzzle => {
                puzzle.rotation.x += 0.1;
                puzzle.rotation.y += 0.1;
                puzzle.rotation.z += 0.1;
            });
        }, 50);
    },
    data() {
        return {
            orbitRotation: 0,
            puzzles: [
                {
                    cancelSelection: noop,
                    selectionProgress: 0,
                    type: '2x2',
                    rotation: randomRotation(),
                },
                {
                    cancelSelection: noop,
                    selectionProgress: 0,
                    type: '3x3',
                    rotation: randomRotation()
                },
                {
                    cancelSelection: noop,
                    selectionProgress: 0,
                    type: '4x4',
                    rotation: randomRotation(),
                },
                {
                    cancelSelection: noop,
                    selectionProgress: 0,
                    type: '5x5',
                    rotation: randomRotation(),
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
                    x: 450 * (1 - puzzle.selectionProgress),
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
                }, speed, easeInCurve);

                selectedPuzzle.cancelSelection = easing.cancel;
            }

            // de-select the previous puzzle
            const prevSelectedPuzzle = this.puzzles.find(puzzle => puzzle.type === prevSelected);

            if (prevSelectedPuzzle) {
                prevSelectedPuzzle.cancelSelection();

                const startingProgress = prevSelectedPuzzle.selectionProgress;
                
                const easing = componentRafEase(this, (progress) => {
                    prevSelectedPuzzle.selectionProgress = startingProgress * (1 - progress);
                }, speed, easeOutCurve);

                prevSelectedPuzzle.cancelSelection = easing.cancel;
            }
        },
    },
};
</script>
