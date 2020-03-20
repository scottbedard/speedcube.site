<template>
    <div class="flex flex-wrap items-center xl:flex-no-wrap">
        <div class="mb-8 overflow-hidden text-center w-full xl:flex-1 xl:mb-0 xl:pr-24 xl:text-left xl:w-auto">
            <h1 class="font-thin mb-8 text-4xl text-grey-8 tracking-wide xl:text-5xl">
                Let the speed cubing begin!
            </h1>

            <p class="max-w-4xl mb-12 mx-auto text-grey-7 text-lg">
                We're a free speed cubing platform for any modern browser.
                Your keyboard is the controller, after some practice it'll
                feel like you're holding the puzzles in your hands.
            </p>

            <div class="-m-4">
                <v-button
                    class="m-4"
                    primary
                    title="Click to begin solving"
                    :to="{
                        name: 'solve',
                        params: {
                            puzzle: selected,
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
                            puzzle: selected,
                        },
                    }">
                    Watch Records
                </v-button>
            </div>
        </div>

        <div class="max-w-xl mx-auto w-full">
            <div class="pb-full relative" :class="{ 'cursor-pointer': hover }">
                <v-scene
                    :camera-angle="90"
                    :camera-distance="1100">

                    <v-light
                        type="ambient"
                        :color="0xffffff"
                        :intensity="1"
                    />

                    <v-obj :rotation="{ z: orbitRotation - 220 }">
                        <v-obj
                            v-for="(puzzle, index) in puzzles"
                            :key="index"
                            :rotation="rotation(index)"
                            :type="puzzle.type">
                            <v-obj
                                :position="position(puzzle)"
                                :rotation="puzzle.rotation"
                                :scale="scale(puzzle)">
                                <v-cube
                                    :type="puzzle.type"
                                    @click="select(puzzle.type)"
                                    @mouseenter="onMouseenter(puzzle.type)"
                                    @mouseleave="onMouseleave(puzzle.type)"
                                />
                            </v-obj>
                        </v-obj>
                    </v-obj>
                </v-scene>
            </div>
        </div>
    </div>
</template>

<script>
import { componentInterval } from 'spyfu-vue-utils';
import { noop, random } from 'lodash-es';
import axesHelperComponent from '@/components/three_old/axes_helper/axes_helper.vue';
import boxComponent from '@/components/three_old/box/box.vue';
import cubeComponent from '@/components/puzzle/cube/cube.vue';
import lightComponent from '@/components/three_old/light/light.vue';
import objComponent from '@/components/three_old/obj/obj.vue';
import sceneComponent from '@/components/three_old/scene/scene.vue';
import { componentRafEase } from '@/app/utils/component';
import {
    easeOutQuart as hoverInCurve,
    easeOutQuart as hoverOutCurve,
    easeOutQuart as selectInCurve,
    easeOutQuart as selectOutCurve,
} from '@/app/constants';

const hoverEaseDuration = 500;
const selectEaseDuration = 1000;

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
            this.orbitRotation += 0.1;

            this.puzzles.forEach((puzzle) => {
                puzzle.rotation.x += 0.2;
                puzzle.rotation.y += 0.2;
                puzzle.rotation.z += 0.2;
            });
        }, 50);
    },
    data() {
        return {
            hover: false,
            orbitRotation: 0,
            puzzles: [
                {
                    cancelSelection: noop,
                    hoverProgress: 0,
                    selectionProgress: 0,
                    type: '2x2',
                    rotation: randomRotation(),
                },
                {
                    cancelSelection: noop,
                    hoverProgress: 0,
                    selectionProgress: 1,
                    type: '3x3',
                    rotation: randomRotation(),
                },
                {
                    cancelSelection: noop,
                    hoverProgress: 0,
                    selectionProgress: 0,
                    type: '4x4',
                    rotation: randomRotation(),
                },
                {
                    cancelSelection: noop,
                    hoverProgress: 0,
                    selectionProgress: 0,
                    type: '5x5',
                    rotation: randomRotation(),
                },
            ],
            selected: '3x3',
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
                x: 500 * (1 - puzzle.selectionProgress),
                z: 650 * puzzle.selectionProgress,
            });
        },
        rotation() {
            return index => ({
                z: (360 / this.puzzles.length) * index,
            });
        },
        scale() {
            const hoverSize = 0.1;

            return (puzzle) => {
                const progress = puzzle.selectionProgress ? 0 : puzzle.hoverProgress;
                const scale = 1 + (hoverSize * progress);

                return { x: scale, y: scale, z: scale };
            };
        },
    },
    methods: {
        select(puzzleType) {
            this.hover = false;
            this.selected = puzzleType;
        },
        onMouseenter(puzzleType) {
            const puzzle = this.puzzles.find(p => p.type === puzzleType);

            if (puzzle && this.selected !== puzzleType) {
                this.hover = true;

                componentRafEase(this, (progress) => {
                    puzzle.hoverProgress = progress;
                }, hoverEaseDuration, hoverInCurve);
            }
        },
        onMouseleave(puzzleType) {
            this.hover = false;

            const puzzle = this.puzzles.find(p => p.type === puzzleType);

            if (puzzle) {
                componentRafEase(this, (progress) => {
                    puzzle.hoverProgress = 1 - progress;
                }, hoverEaseDuration, hoverOutCurve);
            }
        },
    },
    watch: {
        selected(selected, prevSelected) {
            // select the desired puzzle
            const selectedPuzzle = this.puzzles.find(puzzle => puzzle.type === selected);

            if (selectedPuzzle) {
                selectedPuzzle.cancelSelection();

                // @todo: add starting progress for selected puzzle

                const easing = componentRafEase(this, (progress) => {
                    selectedPuzzle.selectionProgress = progress;
                }, selectEaseDuration, selectInCurve);

                selectedPuzzle.cancelSelection = easing.cancel;
            }

            // de-select the previous puzzle
            const prevSelectedPuzzle = this.puzzles.find(puzzle => puzzle.type === prevSelected);

            if (prevSelectedPuzzle) {
                prevSelectedPuzzle.cancelSelection();

                const startingProgress = prevSelectedPuzzle.selectionProgress;

                const easing = componentRafEase(this, (progress) => {
                    prevSelectedPuzzle.selectionProgress = startingProgress * (1 - progress);
                }, selectEaseDuration, selectOutCurve);

                prevSelectedPuzzle.cancelSelection = easing.cancel;
            }
        },
    },
};
</script>
