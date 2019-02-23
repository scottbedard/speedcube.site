<template>
    <v-grid padded>
        <v-grid-cell class="md:order-2 md:text-right" md="7">
                <h2 class="font-thin leading-normal mb-8 text-3xl text-grey-8">
                    Make the puzzles your own
                </h2>
                <p class="font-thin leading-loose mb-8 text-grey-7">
                    All of our puzzles are designed to be customized, so make them look exactly
                    the way you want. You have complete control over everything from the color scheme,
                    to sticker positioning, and even the camera angle!
                </p>
                <p class="font-thin leading-loose text-grey-7">
                    Once everything looks just right, make sure it feels just as good. Your keyboard
                    is the controller. Map any key to whatever turn feels right. After a bit of practice
                    it'll feel like a real puzzle in your hands, one that never pops.
                </p>
        </v-grid-cell>
        <v-grid-cell class="md:order-1" md="5">
            <div class="flex justify-center md:min-h-128">
                <v-fade-transition
                    :enter-duration="500"
                    :leave-duration="500">
                    <div :key="tick">
                        <v-puzzle
                            :config="config"
                            :puzzle="puzzle"
                        />
                    </div>
                </v-fade-transition>
            </div>
        </v-grid-cell>
    </v-grid>
</template>

<script>
import { componentInterval } from 'spyfu-vue-utils';
import { random, sample, shuffle } from 'lodash-es';

function randomConfig() {
    return {
        colors:  shuffle([
            // yellows
            sample([
                '#F7D070', '#F9DA8B', '#F8E3A3', // dull
                '#F7C948', '#FADB5F', '#FCE588', // vivid
            ]),

            // oranges
            sample([
                '#E67635', '#EF8E58', '#FAB38B', // dull
                '#EF4E4E', '#F86A6A', '#FF9B9B', // vivid
            ]),

            // blues
            sample([
                '#4098D7', '#62B0E8', '#84C5F4', // dull
                '#2186EB', '#47A3F3', '#7CC4FA', // vivid
            ]),

            // reds
            sample([
                '#D64545', '#E66A6A', '#F29B9B', // dull
                '#EF4E4E', '#F86A6A', '#FF9B9B', // vivid
            ]),

            // greens
            sample([
                '#57AE5B', '#7BC47F', '#A3D9A5', // dull
                '#3EBD93', '#65D6AD', '#8EEDC7', // vivid
            ]),

            // whites
            sample([
                '#FFFFFF', '#F5F5F5', '#EEEEEE', '#E5E5E5',
            ]),
        ]),
        stickerSpacing:  random(0, 30),
        stickerElevation: random(0, 15),
        stickerRadius: random(0, 50),
        innerBrightness: random(20, 80),
        cameraAngle: random(55, 65),
        cameraDistance: 1900,
        turnDuration: 0,
    }
}

export default {
    created() {
        componentInterval(this, this.update, 1500);
    },
    data() {
        return {
            config: randomConfig(),
            puzzle: '3x3',
            tick: 0,
        };
    },
    methods: {
        update() {
            this.config = randomConfig();
            this.puzzle = sample(['2x2', '3x3', '4x4', '5x5']);
            this.tick += 1;
        },
    },
};
</script>
