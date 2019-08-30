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
            <div class="flex flex-wrap justify-center">
                <div class="mb-6 w-full" style="max-width: 320px">
                    <div class="border-grey-4 pb-full relative">
                        <v-puzzle type="3x3" :config="config" />
                    </div>
                </div>
                <div class="text-sm tracking-wider w-full">
                    <div class="max-w-md mx-auto sm:px-8">
                        <v-grid padded>
                            <v-grid-cell sm="6">
                                <div class="mb-2">Camera Angle</div>
                                <v-range-input
                                    v-model="config.cameraAngle"
                                    :min="0"
                                    :max="90"
                                />
                            </v-grid-cell>
                            <v-grid-cell sm="6">
                                <div class="mb-2">Camera Distance</div>
                                <v-range-input
                                    v-model="config.cameraDistance"
                                    :min="1"
                                    :max="8000"
                                />
                            </v-grid-cell>
                            <v-grid-cell sm="6">
                                <div class="mb-2">Sticker Spacing</div>
                                <v-range-input
                                    v-model="config.stickerSpacing"
                                    :min="0"
                                    :max="1"
                                    :step="0.01"
                                />
                            </v-grid-cell>
                            <v-grid-cell sm="6">
                                <div class="mb-2">Sticker Elevation</div>
                                <v-range-input
                                    v-model="config.stickerElevation"
                                    :min="0"
                                    :max="1"
                                    :step="0.01"
                                />
                            </v-grid-cell>
                            <v-grid-cell sm="6">
                                <div class="mb-2">Sticker Radius</div>
                                <v-range-input
                                    v-model="config.stickerRadius"
                                    :min="0"
                                    :max="0.5"
                                    :step="0.01"
                                />
                            </v-grid-cell>
                            <v-grid-cell sm="6">
                                <div class="mb-2">Inner Brightness</div>
                                <v-range-input
                                    v-model="config.innerBrightness"
                                    :min="0"
                                    :max="1"
                                    :step="0.01"
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
import { cloneDeep } from 'lodash-es';
import { defaultCubeConfig } from '@/app/constants';
import puzzleComponent from '@/components/puzzle/puzzle.vue';

export default {
    data() {
        return {
            config: cloneDeep(defaultCubeConfig),
        };
    },
    components: {
        'v-puzzle': puzzleComponent,
    },
};
</script>
