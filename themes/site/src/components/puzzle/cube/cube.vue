<template>
    <v-box :size="fullBoxSize">
        <template v-for="face in faces" v-slot:[face]>
            <v-group :key="face">
                <v-sphere color="#f00" />
                <v-shape
                    v-for="(sticker, index) in model.state[face]"
                    :geometry="geometry"
                    :inner-material="materials[sticker.value].inner"
                    :key="`${face}${index}`"
                    :outer-material="materials[sticker.value].outer"
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
import { hexColorValue } from '@/app/utils/string';

const faces = ['U', 'L', 'F', 'R', 'B', 'D'];

export default {
    setup(props) {
        // normalized cube configuration
        const config = computed(() => ({ ...defaultCubeConfig, ...props.config }));

        // cube size and sticker indexes
        const layers = computed(() => props.model.options.size);
        const stickers = computed(() => times(layers.value ** 2));

        // box and sticker sizes
        const boxSize = computed(() => 100);
        const stickerSize = computed(() => boxSize.value / layers.value);
        const halfStickerSize = computed(() => stickerSize.value / 2);
        const gapSize = computed(() => stickerSize.value * config.value.stickerSpacing);
        const boxSizeWithGaps = computed(() => boxSize.value + (layers.value - 1) * gapSize.value);
        const halfBoxSize = computed(() => boxSizeWithGaps.value / 2);
        const fullBoxSize = computed(() => boxSizeWithGaps.value + (stickerSize.value * 2 * config.value.stickerElevation));

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
            const baseX = -halfBoxSize.value + halfStickerSize.value;
            const baseY = halfBoxSize.value - halfStickerSize.value;

            return stickers.value.map((i) => {
                const col = colMap.value[i];
                const row = rowMap.value[i];

                return {
                    x: baseX + (col * stickerSize.value) + (col * gapSize.value),
                    y: baseY - (row * stickerSize.value) - (row * gapSize.value),
                };
            });
        });

        // materials
        const materials = computed(() => {
            return faces.map((face, i) => {
                const color = hexColorValue(config.value.colors[i]);

                return {
                    inner: new MeshLambertMaterial({
                        color,
                        side: FrontSide,
                    }),
                    outer: new MeshLambertMaterial({
                        color,
                        opacity: 1,
                        side: BackSide,
                        transparent: false,
                    }),
                };
            });
        });

        useDisposable(geometry);

        return {
            faces,
            fullBoxSize,
            geometry,
            materials,
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
