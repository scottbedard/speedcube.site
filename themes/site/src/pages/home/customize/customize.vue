<template>
    <v-grid padded>
        <v-grid-cell class="md:order-2 md:text-right" md="7">
                <h2 class="font-thin leading-normal mb-8 text-3xl text-grey-8">
                    Make the puzzles your own
                </h2>
                <p class="font-thin leading-loose mb-8 text-grey-7">
                    Every puzzle is built to be customized, so make everything look exactly the way you want.
                    You have complete control over everything from colors to sticker positioning, and even
                    the camera angle.
                </p>
                <p class="font-thin leading-loose text-grey-7">
                    Once everything looks perfect, make sure it feels just as good. Your keyboard
                    is the controller. Map any key to whatever turn feels right. After a bit of practice
                    it'll feel like a real puzzle in your hands, one that never pops.
                </p>
        </v-grid-cell>
        <v-grid-cell class="md:order-1" md="5">
            <div class="flex justify-center md:min-h-128">
                <v-fade-transition
                    :enter-duration="frequency / 3"
                    :leave-duration="frequency / 3">
                    <div :key="tick">
                        <img :src="puzzleSrc" />
                        <!-- <v-puzzle
                            :config="config"
                            :puzzle="puzzle"
                        /> -->
                    </div>
                </v-fade-transition>
            </div>
        </v-grid-cell>
    </v-grid>
</template>

<script>
import { componentInterval } from 'spyfu-vue-utils';
import { random, sample, shuffle } from 'lodash-es';

// @todo: once we get puzzles sharing a renderer, this should be 
//        refactored to use <v-puzzle> and the images should be removed.
// function randomConfig() {
//     return {
//         colors:  shuffle([
//             // yellows
//             sample([
//                 '#F7D070', '#F9DA8B', '#F8E3A3', // dull
//                 '#F7C948', '#FADB5F', '#FCE588', // vivid
//             ]),

//             // oranges
//             sample([
//                 '#E67635', '#EF8E58', '#FAB38B', // dull
//                 '#EF4E4E', '#F86A6A', '#FF9B9B', // vivid
//             ]),

//             // blues
//             sample([
//                 '#4098D7', '#62B0E8', '#84C5F4', // dull
//                 '#2186EB', '#47A3F3', '#7CC4FA', // vivid
//             ]),

//             // reds
//             sample([
//                 '#D64545', '#E66A6A', '#F29B9B', // dull
//                 '#EF4E4E', '#F86A6A', '#FF9B9B', // vivid
//             ]),

//             // greens
//             sample([
//                 '#57AE5B', '#7BC47F', '#A3D9A5', // dull
//                 '#3EBD93', '#65D6AD', '#8EEDC7', // vivid
//             ]),

//             // whites
//             sample([
//                 '#FFFFFF', '#F5F5F5', '#EEEEEE', '#E5E5E5',
//             ]),
//         ]),
//         stickerSpacing:  random(0, 30),
//         stickerElevation: random(0, 15),
//         stickerRadius: random(0, 50),
//         innerBrightness: random(20, 80),
//         cameraAngle: random(55, 65),
//         cameraDistance: 1900,
//         turnDuration: 0,
//     }
// }

import img0 from './0.png';
import img1 from './1.png';
import img2 from './2.png';
import img3 from './3.png';
import img4 from './4.png';
import img5 from './5.png';
import img6 from './6.png';
import img7 from './7.png';
import img8 from './8.png';
import img9 from './9.png';
import img10 from './10.png';
import img11 from './11.png';
import img12 from './12.png';
import img13 from './13.png';
import img14 from './14.png';
import img15 from './15.png';
import img16 from './16.png';
import img17 from './17.png';
import img18 from './18.png';
import img19 from './19.png';
import img20 from './20.png';
import img21 from './21.png';
import img22 from './22.png';
import img23 from './23.png';
import img24 from './24.png';
import img25 from './25.png';
import img26 from './26.png';
import img27 from './27.png';
import img28 from './28.png';
import img29 from './29.png';
import img30 from './30.png';
import img31 from './31.png';
import img32 from './32.png';
import img33 from './33.png';
import img34 from './34.png';

var images = shuffle([
    img0,
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
    img13,
    img14,
    img15,
    img16,
    img17,
    img18,
    img19,
    img20,
    img21,
    img22,
    img23,
    img24,
    img25,
    img26,
    img27,
    img28,
    img29,
    img30,
    img31,
    img32,
    img33,
    img34,
]);

export default {
    created() {
        componentInterval(this, this.update, this.frequency);
    },
    data() {
        return {
            frequency: 3000,
            tick: 0,
        };
    },
    computed: {
        puzzleSrc() {
            return images[this.tick % images.length];
        },
    },
    methods: {
        update() {
            images = shuffle(images);

            this.tick += 1;
        },
    },
};
</script>
