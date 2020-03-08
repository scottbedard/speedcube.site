<template>
    <v-page padded>
        <v-margin padded>
            <div class="max-w-sm mx-auto">
                <div class="border-4 border-dotted border-grey-4 pb-full relative">
                    <v-puzzle
                        type="minx2"
                        :config="{
                            cameraAngle,
                            cameraDistance,
                        }"
                    />
                </div>
            </div>

            <div class="flex justify-center mt-12">
                <div class="p-4 w-full xs:w-1/2 sm:w-1/3">
                    <label class="mb-1 text-grey-7 tracking-wide text-xs uppercase">Camera Angle</label>
                    <v-range-input v-model="cameraAngle" :min="0" :max="90" />
                </div>
                <div class="p-4 w-full xs:w-1/2 sm:w-1/3">
                    <label class="mb-1 text-grey-7 tracking-wide text-xs uppercase">Camera Distance</label>
                    <v-range-input v-model="cameraDistance" :min="0" :max="3000" />
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
        };
    },
    components: {
        'v-puzzle': puzzleComponent,
    },
};
</script>
