<template>
    <v-example title="<v-puzzle>">
        <p>Our base component to manipulate and render puzzles.</p>

        <div class="max-w-sm mx-auto">
            <div class="border-4 border-dotted border-grey-4 pb-full relative">
                <v-puzzle
                    :config="{
                        cameraAngle,
                        cameraDistance,
                        innerOpacity: innerOpacity / 100,
                        stickerElevation: stickerElevation / 100,
                        stickerSpacing: stickerSpacing / 100,
                    }"
                    :current-turn="currentTurn"
                    :turn-progress="turnProgress"
                />
            </div>
        </div>

        <div class="max-w-sm mt-8 mx-auto">
            <div class="mb-4">
                <label class="mb-1 text-grey-7 tracking-wide text-xs uppercase">Current Turn</label>
                <v-input v-model="currentTurn" />
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
                <label class="mb-1 text-grey-7 tracking-wide text-xs uppercase">Sticker Spacing</label>
                <v-range-input v-model="stickerSpacing" :min="0" :max="100" />
            </div>
            <div class="mb-4">
                <label class="mb-1 text-grey-7 tracking-wide text-xs uppercase">Sticker Elevation</label>
                <v-range-input v-model="stickerElevation" :min="0" :max="100" />
            </div>
            <div class="mb-4">
                <label class="mb-1 text-grey-7 tracking-wide text-xs uppercase">Inner Opacity</label>
                <v-range-input v-model="innerOpacity" :min="0" :max="100" />
            </div>
        </div>
    </v-example>
</template>

<script>
import exampleComponent from '../example.vue';
import puzzleComponent from '@/components/puzzle/puzzle.vue';

export default {
    data() {
        return {
            cameraAngle: 45,
            cameraDistance: 250,
            currentTurn: 'U',
            innerOpacity: 80,
            stickerElevation: 20,
            stickerSpacing: 20,
            turnProgress: 0,
        };
    },
    components: {
        'v-example': exampleComponent,
        'v-puzzle': puzzleComponent,
    },
    methods: {
        go() {
            console.log('go')
        },
    },
};
</script>
