<template>
    <v-page padded>
        <v-margin padded>
            <div class="max-w-sm mx-auto">
                <div class="border-4 border-dotted border-grey-4 pb-full relative">
                    <v-puzzle
                        type="minx2"
                        :config="{
                            size: 3,
                            cameraAngle,
                            cameraDistance,
                            stickerRadius,
                            stickerSpacing,
                        }"
                    />
                </div>
            </div>

            <div class="flex flex-wrap justify-center mt-12 max-w-2xl mx-auto">
                <div class="p-4 w-full xs:w-1/2">
                    <label class="mb-1 text-grey-7 tracking-wide text-xs uppercase">Camera Angle</label>
                    <v-range-input v-model="cameraAngle" :min="0" :max="90" />
                </div>
                <div class="p-4 w-full xs:w-1/2">
                    <label class="mb-1 text-grey-7 tracking-wide text-xs uppercase">Camera Distance</label>
                    <v-range-input v-model="cameraDistance" :min="0" :max="3000" />
                </div>
                <div class="p-4 w-full xs:w-1/2">
                    <label class="mb-1 text-grey-7 tracking-wide text-xs uppercase">Sticker Spacing</label>
                    <v-range-input v-model="stickerSpacing" :min="0" :max="50" />
                </div>
                <div class="p-4 w-full xs:w-1/2">
                    <label class="mb-1 text-grey-7 tracking-wide text-xs uppercase">Sticker Radius</label>
                    <v-range-input v-model="stickerRadius" :min="0" :max="0.5" :step="0.01" />
                </div>
            </div>
        </v-margin>
    </v-page>
</template>

<script>
import puzzleComponent from '@/components/puzzle/puzzle.vue';

export default {
    data() {
        return {
            cameraAngle: 90,
            cameraDistance: 250,
            stickerRadius: 0.2,
            stickerSpacing: 20,
        };
    },
    components: {
        'v-puzzle': puzzleComponent,
    },
};
</script>
