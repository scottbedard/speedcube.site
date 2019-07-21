<template>
    <v-example title="<v-puzzle>">
        <p>Our base component to manipulate and render puzzles.</p>

        <div class="max-w-sm mx-auto">
            <div class="border-4 border-dotted border-grey-4 pb-full relative">
                <v-puzzle
                    :current-turn="currentTurn"
                    :turn-progress="turnProgress"
                    :config="config"
                    :model="model"
                    type="3x3"
                />
            </div>
        </div>

        <div class="max-w-sm mt-8 mx-auto">
            <div class="mb-8">
                <label class="mb-1 text-grey-7 tracking-wide text-xs uppercase">Turn</label>
                <div class="flex">
                    <div class="flex-1 pr-4">
                        <v-input v-model="currentTurn" />
                    </div>
                    <v-button @click="turn">Apply</v-button>
                </div>
            </div>
            <div class="mb-4">
                <label class="mb-1 text-grey-7 tracking-wide text-xs uppercase">Turn Progress</label>
                <v-range-input v-model="turnProgress" :min="0" :max="100" />
            </div>
            <div class="mb-4">
                <label class="mb-1 text-grey-7 tracking-wide text-xs uppercase">Camera Angle</label>
                <v-range-input v-model="cameraAngle" :min="0" :max="90" />
            </div>
            <div class="mb-4">
                <label class="mb-1 text-grey-7 tracking-wide text-xs uppercase">Camera Distance</label>
                <v-range-input v-model="cameraDistance" :min="0" :max="400" />
            </div>
            <div class="mb-4">
                <label class="mb-1 text-grey-7 tracking-wide text-xs uppercase">Sticker Radius</label>
                <v-range-input v-model="stickerRadius" :min="0" :max="1" :step="0.01" />
            </div>
            <div class="mb-4">
                <label class="mb-1 text-grey-7 tracking-wide text-xs uppercase">Sticker Spacing</label>
                <v-range-input v-model="stickerSpacing" :min="0" :max="1" :step="0.01" />
            </div>
            <div class="mb-4">
                <label class="mb-1 text-grey-7 tracking-wide text-xs uppercase">Sticker Elevation</label>
                <v-range-input v-model="stickerElevation" :min="0" :max="1" :step="0.01" />
            </div>
            <div class="mb-4">
                <label class="mb-1 text-grey-7 tracking-wide text-xs uppercase">Inner Brightness</label>
                <v-range-input v-model="innerBrightness" :min="0" :max="100" />
            </div>
        </div>
    </v-example>
</template>

<script>
import { componentEase } from 'spyfu-vue-utils';
import Cube from 'bedard-cube';
import exampleComponent from '../example.vue';
import puzzleComponent from '@/components/puzzle/puzzle.vue';

export default {
    data() {
        return {
            cameraAngle: 45,
            cameraDistance: 250,
            colors: ['#FFEE5D', '#EFAA18', '#2589E2', '#EC6157', '#5CBD60', '#F0F0F0'],
            currentTurn: 'U',
            innerBrightness: 80,
            model: new Cube(2, { useObjects: true }),
            stickerElevation: 0.25,
            stickerSpacing: 0.25,
            stickerRadius: 0.25,
            turnProgress: 25,
        };
    },
    components: {
        'v-example': exampleComponent,
        'v-puzzle': puzzleComponent,
    },
    computed: {
        config() {
            return {
                cameraAngle: this.cameraAngle,
                cameraDistance: this.cameraDistance,
                colors: this.colors,
                innerBrightness: this.innerBrightness,
                stickerElevation: this.stickerElevation,
                stickerRadius: this.stickerRadius,
                stickerSpacing: this.stickerSpacing,
            };
        },
    },
    methods: {
        turn() {
            const easeInOutQuart = [0.77, 0, 0.175, 1];

            componentEase(this, (val) => {
                this.turnProgress = val * 100;
            }, 500, easeInOutQuart);
        },
    },
};
</script>
