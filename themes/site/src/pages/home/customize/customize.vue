<style lang="scss" scoped>
.puzzle-container {
    min-height: 320px;
}
</style>

<template>
    <v-grid padded>
        <v-grid-cell class="lg:order-2" lg="7">
            <h2 class="font-light leading-normal mb-8 text-3xl text-grey-8 lg:mt-12">
                Make the puzzles your own.
            </h2>
            <div class="leading-loose text-grey-7">
                <p class="mb-8">
                    Everything is customizable. Pick your colors, sticker positioning,
                    even the camera angle. Your replays will save this configuration,
                    so others will see the solve and see it exactly as you did.
                </p>
                <p>
                    Key bindings are also configurable. By default, they mimick how
                    real finger tricks feel. Modify these as much or as little as
                    you like to have the puzzle feeling just right.
                </p>
            </div>
        </v-grid-cell>
        <v-grid-cell class="lg:order-1" lg="5">
            <div class="flex flex-wrap justify-center text-grey-7">
                <div class="puzzle-container">
                    <v-fade-transition>
                        <div :key="tick">
                            <v-puzzle
                                :config="config"
                                :puzzle="puzzle"
                            />
                        </div>
                    </v-fade-transition>
                </div>
                <div class="text-grey-7 text-center text-sm tracking-wide w-full">
                    <div class="max-w-md mx-auto sm:px-8">
                        <v-grid padded>
                            <v-grid-cell sm="6">
                                <div class="mb-4">Camera Angle</div>
                                <v-range-input
                                    v-model="config.cameraAngle"
                                    :min="0"
                                    :max="90"
                                />
                            </v-grid-cell>
                            <v-grid-cell sm="6">
                                <div class="mb-4">Camera Distance</div>
                                <v-range-input
                                    v-model="config.cameraDistance"
                                    :min="1"
                                    :max="8000"
                                />
                            </v-grid-cell>
                            <v-grid-cell sm="6">
                                <div class="mb-4">Sticker Spacing</div>
                                <v-range-input
                                    v-model="config.stickerSpacing"
                                    :min="0"
                                    :max="100"
                                />
                            </v-grid-cell>
                            <v-grid-cell sm="6">
                                <div class="mb-4">Sticker Elevation</div>
                                <v-range-input
                                    v-model="config.stickerElevation"
                                    :min="0"
                                    :max="100"
                                />
                            </v-grid-cell>
                            <v-grid-cell sm="6">
                                <div class="mb-4">Sticker Radius</div>
                                <v-range-input
                                    v-model="config.stickerRadius"
                                    :min="0"
                                    :max="50"
                                />
                            </v-grid-cell>
                            <v-grid-cell sm="6">
                                <div class="mb-4">Inner Brightness</div>
                                <v-range-input
                                    v-model="config.innerBrightness"
                                    :min="0"
                                    :max="100"
                                />
                            </v-grid-cell>
                        </v-grid>
                    </div>
                </div>
            </div>
        </v-grid-cell>
    </v-grid>
</template>

<script>
import { random, sample, shuffle } from 'lodash-es';

const initialPuzzles = [
    {
        config: '{"colors":["#FFEE5D","#EFAA18","#2589E2","#EC6157","#5CBD60","#F0F0F0"],"stickerSpacing":18,"stickerElevation":15,"stickerRadius":9,"innerBrightness":82,"cameraAngle":52,"cameraDistance":2134,"turnDuration":82}',
        puzzle: '3x3',
    },
    // ...
];

// function randomConfig() {
//     return {
//         colors: shuffle([
//             sample([
//                 // yellows
//                 '#F7D070', '#F9DA8B', '#F8E3A3', // dull
//                 '#F7C948', '#FADB5F', '#FCE588', // vivid
//             ]),

//             sample([
//                 // oranges
//                 '#E67635', '#EF8E58', '#FAB38B', // dull
//                 '#fa7a47', '#ff9f71', '#ffb893', // vivid
//             ]),
//             sample([
//                 // blues
//                 '#4098D7', '#62B0E8', '#84C5F4', // dull
//                 '#2186EB', '#47A3F3', '#7CC4FA', // vivid

//                 // purples
//                 '#724BB7', '#8662C7', '#A081D9', // dull
//                 '#9446ED', '#A368FC', '#B990FF', // vivid
//             ]),
//             sample([
//                 // reds
//                 '#D64545', '#E66A6A', '#F29B9B', // dull
//                 '#EF4E4E', '#F86A6A', '#FF9B9B', // vivid

//                 // pinks
//                 '#DA4A91', '#E668A7', '#F191C1', // dull
//             ]),
//             sample([
//                 // greens
//                 '#57AE5B', '#7BC47F', '#A3D9A5', // dull
//                 '#3EBD93', '#65D6AD', '#8EEDC7', // vivid

//                 // teals
//                 '#008080', '#66b2b2', '#b2d8d8',
//             ]),
//             sample([
//                 // whites
//                 '#FFFFFF', '#F5F5F5', '#EEEEEE', '#E5E5E5',
//             ]),
//         ]),
//         stickerSpacing: random(1, 30),
//         stickerElevation: random(1, 15),
//         stickerRadius: random(0, 50),
//         innerBrightness: random(20, 80),
//         cameraAngle: random(55, 65),
//         cameraDistance: 2000,
//         turnDuration: 0,
//     };
// }

function randomPuzzle() {
    return sample(['2x2', '3x3', '4x4', '5x5']);
}

export default {
    data() {
        const { config, puzzle } = sample(initialPuzzles);

        return {
            config: JSON.parse(config),
            puzzle,
            tick: 0,
        };
    },
    methods: {
        next() {
            this.config = randomConfig();
            this.puzzle = randomPuzzle();
            this.tick += 1;
        },
    },
};
</script>
