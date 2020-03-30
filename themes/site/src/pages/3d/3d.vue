<template>
    <v-page padded>
        <v-margin padded>
            <h1 class="mb-12">3D Sandbox</h1>

            <div>
                <div class="max-w-md mx-auto mb-12">
                    <v-puzzle
                        debug
                        turn="R"
                        type="megaminx"
                        :camera-angle="cameraAngle"
                        :camera-distance="cameraDistance"
                        :config="config"
                        :rotation="rotation"
                        :size="100"
                        :turn-progress="turnProgress"
                    />
                </div>

                <div class="flex max-w-lg mb-6 mx-auto text-center">
                    <div class="flex-1 px-3">
                        <div>Camera angle</div>
                        <v-range-input v-model="cameraAngle" :min="0" :max="90" />
                    </div>
                    <div class="flex-1 px-3">
                        <div>Camera distance</div>
                        <v-range-input v-model="cameraDistance" :min="0" :max="500" />
                    </div>
                    <div class="flex-1 px-3">
                        <div>Turn progress</div>
                        <v-range-input v-model="turnProgress" :min="0" :max="1" :step="0.01" />
                    </div>
                </div>

                <div class="flex max-w-lg mb-6 mx-auto text-center">
                    <div class="flex-1 px-3">
                        <div>Rotation X</div>
                        <v-range-input v-model="rotation.x" :min="-180" :max="180" />
                    </div>
                    <div class="flex-1 px-3">
                        <div>Rotation Y</div>
                        <v-range-input v-model="rotation.y" :min="-180" :max="180" />
                    </div>
                    <div class="flex-1 px-3">
                        <div>Rotation Z</div>
                        <v-range-input v-model="rotation.z" :min="-180" :max="180" />
                    </div>
                </div>

                <div class="flex max-w-lg mb-6 mx-auto text-center">
                    <div class="flex-1 px-3">
                        <div>Center</div>
                        <v-range-input v-model="config.centerSize" :min="0" :max="0.4" :step="0.01" />
                    </div>
                    <div class="flex-1 px-3">
                        <div>Spacing</div>
                        <v-range-input v-model="config.stickerSpacing" :min="0" :max="0.5" :step="0.01" />
                    </div>
                    <div class="flex-1 px-3">
                        <div>Elevation</div>
                        <v-range-input v-model="config.stickerElevation" :min="0" :max="100" :step="1" />
                    </div>
                    <div class="flex-1 px-3">
                        <div>Radius</div>
                        <v-range-input v-model="config.stickerRadius" :min="0" :max="0.5" :step="0.01" />
                    </div>
                </div>

                <pre class="text-xs max-w-sm mx-auto">{{ $data }}</pre>
            </div>
        </v-margin>
    </v-page>
</template>

<script>
import puzzleComponent from '@/components/puzzle/puzzle.vue';

export default {
    data() {
        return {
            cameraAngle: 35,
            cameraDistance: 400,
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            turnProgress: 0,
            config: {
                centerSize: 0.05,
                stickerRadius: 0,
                stickerSpacing: 0.2,
                stickerElevation: 0,
            },
        };
    },
    components: {
        'v-puzzle': puzzleComponent,
    },
};
</script>
