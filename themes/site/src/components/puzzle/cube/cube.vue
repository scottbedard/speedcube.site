<template>
    <v-obj>
        <!--
            render stickers not effected by the current
            turn in their default positions
        -->
        <v-cube-position
            :config="config"
            :geometry="geometry"
            :model="model"
            :sticker-size="stickerSize"
        />

        <!--
            next, we'll create an object to hold the stickers
            that are being turned and rotate it
        -->
        <v-obj>
            <!-- ... -->
        </v-obj>
    </v-obj>
</template>

<script>
import Cube from 'bedard-cube';
import cubePositionComponent from './cube_position/cube_position.vue';
import objComponent from '@/components/three/obj/obj.vue';
import { roundedRectangle } from '@/components/three/geometries';
import { get } from 'lodash-es';

export default {
    destroyed() {
        this.geometry.dispose();
    },
    components: {
        'v-cube-position': cubePositionComponent,
        'v-obj': objComponent,
    },
    computed: {
        geometry() {
            return roundedRectangle(this.stickerSize, this.stickerSize, this.stickerSize * this.stickerRadius);
        },
        stickerRadius() {
            return get(this.config, 'stickerRadius', 0.2);
        },
        stickerSize() {
            return 100 / this.model.size;
        },
    },
    methods: {
    },
    props: {
        config: {
            default: () => ({}),
            type: Object,
        },
        currentTurn: {
            type: String,
        },
        model: {
            default() {
                return new Cube(3);
            },
            type: Object,
        },
        turnProgress: {
            default: 0,
            type: Number,
        },
    },
    watch: {
        geometry(newGeometry, oldGeometry) {
            oldGeometry.dispose();
        },
    },
};
</script>