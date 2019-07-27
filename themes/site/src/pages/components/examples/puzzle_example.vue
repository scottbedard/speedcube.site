<template>
    <v-example title="<v-puzzle>">
        <p>A higher-level component to render whole puzzles.</p>

        <div class="flex flex-wrap justify-center my-8">
            <div v-for="n in puzzles" class="mb-4 w-full" style="max-width: 320px" :key="n">
                <div class="border-4 border-dotted border-grey-4 pb-full relative">
                    <v-puzzle
                        :current-turn="currentTurn"
                        :turn-progress="turnProgress"
                        :config="config"
                        :model="model"
                        :type="`${model.size}x${model.size}`"
                    />
                </div>
            </div>
            <div v-if="puzzles === 1" class="max-w-xs text-xs px-8 w-full">
                <pre class="mb-4">turnProgress: {{ turnProgress }}</pre>
                <pre>config: {{ config }}</pre>
            </div>
        </div>

        <!-- cube controls -->
        <div>
            <div class="max-w-sm mb-8 mx-auto">
                <label class="mb-1 text-grey-7 tracking-wide text-xs uppercase">Current Turn</label>
                <div class="flex">
                    <div class="flex-1 pr-8">
                        <v-input v-model="currentTurn" />
                    </div>
                    <v-button @click="turn">Apply</v-button>
                </div>
            </div>
            <div class="max-w-3xl mx-auto">
                <div class="flex flex-wrap -m-4">
                    <div class="p-4 w-full xs:w-1/2 sm:w-1/3">
                        <label class="mb-1 text-grey-7 tracking-wide text-xs uppercase">Turn Progress</label>
                        <v-range-input v-model="turnProgress" :min="0" :max="1" :step="0.01" />
                    </div>
                    <div class="p-4 w-full xs:w-1/2 sm:w-1/3">
                        <label class="mb-1 text-grey-7 tracking-wide text-xs uppercase">Camera Angle</label>
                        <v-range-input v-model="cameraAngle" :min="0" :max="90" />
                    </div>
                    <div class="p-4 w-full xs:w-1/2 sm:w-1/3">
                        <label class="mb-1 text-grey-7 tracking-wide text-xs uppercase">Camera Distance</label>
                        <v-range-input v-model="cameraDistance" :min="0" :max="1000" />
                    </div>
                    <div class="p-4 w-full xs:w-1/2 sm:w-1/3">
                        <label class="mb-1 text-grey-7 tracking-wide text-xs uppercase">Sticker Radius</label>
                        <v-range-input v-model="stickerRadius" :min="0" :max="0.5" :step="0.01" />
                    </div>
                    <div class="p-4 w-full xs:w-1/2 sm:w-1/3">
                        <label class="mb-1 text-grey-7 tracking-wide text-xs uppercase">Sticker Spacing</label>
                        <v-range-input v-model="stickerSpacing" :min="0" :max="1" :step="0.01" />
                    </div>
                    <div class="p-4 w-full xs:w-1/2 sm:w-1/3">
                        <label class="mb-1 text-grey-7 tracking-wide text-xs uppercase">Sticker Elevation</label>
                        <v-range-input v-model="stickerElevation" :min="0" :max="1" :step="0.01" />
                    </div>
                    <div class="p-4 w-full xs:w-1/2 sm:w-1/3">
                        <label class="mb-1 text-grey-7 tracking-wide text-xs uppercase">Inner Brightness</label>
                        <v-range-input v-model="innerBrightness" :min="0" :max="1" :step="0.01" />
                    </div>
                </div>
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
            innerBrightness: 0.8,
            model: new Cube(3, { useObjects: true }),
            stickerElevation: 0.15,
            stickerSpacing: 0.2,
            stickerRadius: 0.1,
            turnProgress: 0.3,
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
        puzzles() {
            // the number of puzzles to render
            return 1;
        },
    },
    methods: {
        turn() {
            const easeInOutQuart = [0.77, 0, 0.175, 1];

            componentEase(this, (val) => {
                this.turnProgress = val;
            }, 500, easeInOutQuart);
        },
    },
};
</script>
