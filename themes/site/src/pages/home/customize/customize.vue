<style lang="scss" scoped>
.puzzle-container {
    min-height: 320px;
}
</style>

<template>
    <v-grid padded>
        <v-grid-cell class="lg:order-2" lg="7">
            <h2 class="font-thin leading-normal mb-4 text-2xl text-grey-8 lg:mt-12">
                Make the puzzles your own
            </h2>
            <p class="font-thin leading-loose mb-4 text-grey-7">
                Our puzzles are built to be customized, make everything look exactly the way you want.
                You have control over everything from colors to sticker positioning, and even
                the camera angle.
            </p>
            <p class="font-thin leading-loose text-grey-7">
                Once everything looks perfect, make sure it feels just as good. Your keyboard
                is the controller. Map any key to whatever turn feels right. After a bit of practice
                it'll feel like a real puzzle in your hands, except it never pops.
            </p>
        </v-grid-cell>
        <v-grid-cell class="lg:order-1" lg="5">
            <div class="flex flex-wrap justify-center text-grey-7 trans-color hover:text-grey-8">
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
                <div class="text-center w-full">
                    <v-button @click="next">
                        Click here for inspiration
                    </v-button>
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

function randomConfig() {
    return {
        colors: shuffle([
            sample([
                // yellows
                '#F7D070', '#F9DA8B', '#F8E3A3', // dull
                '#F7C948', '#FADB5F', '#FCE588', // vivid
            ]),

            sample([
                // oranges
                '#E67635', '#EF8E58', '#FAB38B', // dull
                '#fa7a47', '#ff9f71', '#ffb893', // vivid
            ]),
            sample([
                // blues
                '#4098D7', '#62B0E8', '#84C5F4', // dull
                '#2186EB', '#47A3F3', '#7CC4FA', // vivid

                // purples
                '#724BB7', '#8662C7', '#A081D9', // dull
                '#9446ED', '#A368FC', '#B990FF', // vivid
            ]),
            sample([
                // reds
                '#D64545', '#E66A6A', '#F29B9B', // dull
                '#EF4E4E', '#F86A6A', '#FF9B9B', // vivid

                // pinks
                '#DA4A91', '#E668A7', '#F191C1', // dull
            ]),
            sample([
                // greens
                '#57AE5B', '#7BC47F', '#A3D9A5', // dull
                '#3EBD93', '#65D6AD', '#8EEDC7', // vivid

                // teals
                '#008080', '#66b2b2', '#b2d8d8',
            ]),
            sample([
                // whites
                '#FFFFFF', '#F5F5F5', '#EEEEEE', '#E5E5E5',
            ]),
        ]),
        stickerSpacing: random(1, 30),
        stickerElevation: random(1, 15),
        stickerRadius: random(0, 50),
        innerBrightness: random(20, 80),
        cameraAngle: random(55, 65),
        cameraDistance: 2000,
        turnDuration: 0,
    };
}

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
