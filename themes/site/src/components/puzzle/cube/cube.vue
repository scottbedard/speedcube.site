<template>
    <v-box :size="boxSize">
        <template v-for="face in faces" v-slot:[face]>
            <v-group :key="face">
                <v-sphere color="#f00" />
                <v-shape
                    v-for="(sticker, index) in model.state[face]"
                    :geometry="geometry"
                    :inner-material="innerMaterial"
                    :key="`${face}${index}`"
                    :outer-material="outerMaterial"
                    :position="positions[index]"
                    :rotation="{ x: 180 }"
                />
            </v-group>
        </template>
    </v-box>
</template>

<script>
import { times } from 'lodash-es';
import { BackSide, FrontSide, MeshLambertMaterial } from 'three';
import { useDisposable } from 'vue-use-three';
import { computed, watch } from '@vue/composition-api';
import { defaultCubeConfig } from '@/app/constants';
import axesHelperComponent from '../../three/axes_helper/axes_helper.vue';
import boxComponent from '../../three/geometries/box/box.vue';
import groupComponent from '../../three/group/group.vue';
import shapeComponent from '../../three/shape/shape.vue';
import sphereComponent from '../../three/geometries/sphere/sphere.vue';
import { roundedSquare } from '@/app/utils/geometry';

const faces = ['U', 'L', 'F', 'R', 'B', 'D'];

const gapSize = 0;

export default {
    setup(props) {
        // normalized cube configuration
        const config = computed(() => ({ ...defaultCubeConfig, ...props.config }));

        // cube size and sticker indexes
        const layers = computed(() => props.model.options.size);
        const stickers = computed(() => times(layers.value ** 2));

        // box and sticker sizes
        const boxSize = computed(() => 100);
        const halfBoxSize = computed(() => boxSize.value / 2);
        const stickerSize = computed(() => boxSize.value / layers.value);
        const halfStickerSize = computed(() => stickerSize.value / 2);

        // sticker geometry
        const geometry = computed(() => {
            return roundedSquare(boxSize.value / layers.value, config.value.stickerRadius);
        });

        watch(geometry, (current, prev) => {
            if (prev) prev.dispose();
        });

        // column and row maps
        // these determine which col/row a sticker belongs to
        const colMap = computed(() => stickers.value.map(i => i % layers.value));
        const rowMap = computed(() => stickers.value.map(i => Math.floor(i / layers.value)));

        // sticker positions
        const positions = computed(() => {
            return stickers.value.map((i) => {
                const col = colMap.value[i];
                const row = rowMap.value[i];

                return {
                    x: (-halfBoxSize.value + halfStickerSize.value) + (stickerSize.value * col),
                    y: (halfBoxSize.value - halfStickerSize.value) - (stickerSize.value * row),
                };
            });
        });

        const innerMaterial = new MeshLambertMaterial({
            color: 0x0000ff,
            side: FrontSide,
        });

        const outerMaterial = new MeshLambertMaterial({
            color: 0x00ff00,
            opacity: 1,
            side: BackSide,
            transparent: false,
        });

        useDisposable(geometry, innerMaterial, outerMaterial);

        return {
            boxSize,
            faces,
            geometry,
            innerMaterial,
            outerMaterial,
            positions,
        };
    },
    components: {
        'v-axes-helper': axesHelperComponent,
        'v-box': boxComponent,
        'v-group': groupComponent,
        'v-shape': shapeComponent,
        'v-sphere': sphereComponent,
    },
    props: {
        config: Object,
        model: Object,
    },
};
</script>
