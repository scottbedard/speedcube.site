<style lang="scss" scoped>
.puzzle-container {
    min-height: 320px;
}
</style>

<template>
    <v-grid padded>
        <v-grid-cell lg="6">
            <h2 class="font-thin leading-normal mb-8 text-3xl text-grey-8">
                Customize everything
            </h2>
            <p class="mb-8 text-lg">
                Make the puzzles your own. You have control over the colors,
                sticker positioning, camera angle, and so much more. Your replays
                will save this configuration so others can see the solve exactly
                as you did.
            </p>
            <p class="text-lg">
                Key bindings are also customizable. By default, they mimick how
                real finger tricks feel. Modify them as much or as little as
                you like to have your algorithms feeling just right.
            </p>
        </v-grid-cell>
        <v-grid-cell lg="6">
            <div class="flex flex-wrap justify-center">
                <div class="mb-6 w-full" style="max-width: 280px">
                    <div class="border-grey-4 pb-full relative">
                        <v-puzzle type="3x3" :config="config" />
                    </div>
                </div>
                <div class="text-sm tracking-wider w-full">
                    <div class="max-w-lg mx-auto text-grey-7 tracking-wider">
                        <v-grid padded>
                            <v-grid-cell xs="6">
                                <div class="mb-1">Camera Angle</div>
                                <v-range-input
                                    v-model="config.cameraAngle"
                                    :min="0"
                                    :max="90"
                                />
                            </v-grid-cell>
                            <v-grid-cell xs="6">
                                <div class="mb-1">Camera Distance</div>
                                <v-range-input
                                    v-model="config.cameraDistance"
                                    :min="1"
                                    :max="800"
                                />
                            </v-grid-cell>
                            <v-grid-cell xs="6">
                                <div class="mb-1">Sticker Spacing</div>
                                <v-range-input
                                    v-model="config.stickerSpacing"
                                    :min="0"
                                    :max="1"
                                    :step="0.0001"
                                />
                            </v-grid-cell>
                            <v-grid-cell xs="6">
                                <div class="mb-1">Sticker Elevation</div>
                                <v-range-input
                                    v-model="config.stickerElevation"
                                    :min="0"
                                    :max="1"
                                    :step="0.0001"
                                />
                            </v-grid-cell>
                            <v-grid-cell xs="6">
                                <div class="mb-1">Sticker Radius</div>
                                <v-range-input
                                    v-model="config.stickerRadius"
                                    :min="0"
                                    :max="0.5"
                                    :step="0.0001"
                                />
                            </v-grid-cell>
                            <v-grid-cell xs="6">
                                <div class="mb-1">Inner Brightness</div>
                                <v-range-input
                                    v-model="config.innerBrightness"
                                    :min="0"
                                    :max="1"
                                    :step="0.0001"
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
