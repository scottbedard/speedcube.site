<template>
    <v-box :size="100">
        <template #u>
            <!-- <v-sphere color="#0f0" /> -->
            <v-shape
                :geometry="geometry"
                :inner-material="innerMaterial"
                :outer-material="outerMaterial"
            />
        </template>
        <template #l>
            <v-sphere color="#ff0" />
        </template>
        <template #f>
            <v-sphere color="#0ff" />
        </template>
        <template #r>
            <v-sphere color="#f00" />
        </template>
        <template #b>
            <v-sphere color="#00f" />
        </template>
        <template #d>
            <v-sphere color="#f0f" />
        </template>
    </v-box>
</template>

<script>
import { BackSide, FrontSide, MeshLambertMaterial } from 'three';
import { useDisposable } from 'vue-use-three';
import boxComponent from '../../three/geometries/box/box.vue';
import groupComponent from '../../three/group/group.vue';
import shapeComponent from '../../three/shape/shape.vue';
import sphereComponent from '../../three/geometries/sphere/sphere.vue';
import { polygon } from '@/app/utils/geometry';

export default {
    setup() {
        const geometry = polygon(20, 4);

        const innerMaterial = new MeshLambertMaterial({
            color: 0xff0000,
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
            geometry,
            innerMaterial,
            outerMaterial,
        };
    },
    components: {
        'v-box': boxComponent,
        'v-group': groupComponent,
        'v-shape': shapeComponent,
        'v-sphere': sphereComponent,
    },
};
</script>
