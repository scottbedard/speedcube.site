<template>
    <div class="flex flex-wrap md:flex-no-wrap">
        <div class="overflow-hidden w-full md:flex-1 md:pr-12 md:w-auto">
            <h1 class="mb-8 text-4xl text-grey-8 lg:text-5xl">
                A free and open place for cubing
            </h1>
            <p class="mb-12 text-grey-7 text-lg">
                We're a speed cubing platform for any modern browser.
                Your keyboard is the controller. After some practice,
                it'll feel you're holding it in your hands.
            </p>

            <div class="-m-4">
                <v-button
                    class="m-4"
                    primary
                    title="Click to begin solving"
                    :to="{
                        name: 'solve',
                        params: {
                            puzzle: '3x3',
                        },
                    }">
                    Start Solving
                </v-button>
                <v-button
                    class="m-4"
                    title="Click to view the current records"
                    :to="{
                        name: 'records',
                        params: {
                            puzzle: '3x3',
                        },
                    }">
                    Watch Records
                </v-button>
            </div>

            <br><br><br>

            <a href="#" @click.prevent="select('2x2')">2x2</a>&nbsp;&nbsp;&nbsp;
            <a href="#" @click.prevent="select('3x3')">3x3</a>&nbsp;&nbsp;&nbsp;
            <a href="#" @click.prevent="select('4x4')">4x4</a>&nbsp;&nbsp;&nbsp;
            <a href="#" @click.prevent="select('5x5')">5x5</a>&nbsp;&nbsp;&nbsp;
        </div>

        <div class="max-w-xl mx-auto w-full md:w-half">
            <div class="pb-full relative">
                <v-scene
                    :camera-angle="90"
                    :camera-distance="1000">

                    <v-box :size="200" :color="0xff0000" />

                    <!-- <v-axes-helper :size="200" /> -->

                    <v-light
                        type="ambient"
                        :color="0xffffff"
                        :intensity="1"
                    />

                    <!-- <v-obj :rotation="{ z: orbitRotation }">
                        <v-obj
                            v-for="(puzzle, index) in puzzles"
                            :key="index"
                            :rotation="rotation(index)"
                            :type="puzzle.type">
                            <v-obj :position="position(puzzle)" :rotation="puzzle.rotation">
                                <v-cube :type="puzzle.type" />
                            </v-obj>
                        </v-obj>
                    </v-obj> -->
                </v-scene>
            </div>
        </div>
    </div>
</template>

<script>
import { componentInterval } from 'spyfu-vue-utils';
import { noop, random } from 'lodash-es';
import axesHelperComponent from '@/components/three/axes_helper/axes_helper.vue';
import boxComponent from '@/components/three/box/box.vue';
import cubeComponent from '@/components/puzzle/cube/cube.vue';
import lightComponent from '@/components/three/light/light.vue';
import objComponent from '@/components/three/obj/obj.vue';
import sceneComponent from '@/components/three/scene/scene.vue';
import { componentRafEase } from '@/app/utils/component';
import { easeOutQuart as easeInCurve, easeOutQuart as easeOutCurve } from '@/app/constants';

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
            this.orbitRotation += 0.15;

            this.puzzles.forEach((puzzle) => {
                puzzle.rotation.x += 0.2;
                puzzle.rotation.y += 0.2;
                puzzle.rotation.z += 0.2;
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
                    rotation: randomRotation(),
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
            return puzzle => ({
                x: 450 * (1 - puzzle.selectionProgress),
                z: 600 * (puzzle.selectionProgress),
            });
        },
        rotation() {
            return index => ({
                z: (360 / this.puzzles.length) * index,
            });
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

                // @todo: add starting progress for selected puzzle

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
