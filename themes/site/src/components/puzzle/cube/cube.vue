<template>
    <v-box :size="100">
        <template v-for="face in faces" v-slot:[face]>
            <v-group :key="face">
                <v-axes-helper />
                <v-sphere color="#ff0" />
                <v-shape
                    :geometry="geometry"
                    :inner-material="innerMaterial"
                    :outer-material="outerMaterial"
                    :position="{ x: 0, y: 0 }"
                    :rotation="{ x: 180, z: 180 }"
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

const faces = ['u', 'l', 'f', 'r', 'b', 'd'];

export default {
    setup(props) {
        const config = computed(() => ({ ...defaultCubeConfig, ...props.config }));
        const layers = computed(() => props.model.options.size);
        const geometry = computed(() => roundedSquare(100 / layers.value, config.value.stickerRadius));

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

        watch(geometry, (current, prev) => {
            if (prev) prev.dispose();
        });

        useDisposable(geometry, innerMaterial, outerMaterial);

        return {
            faces,
            geometry,
            innerMaterial,
            layers,
            outerMaterial,
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
