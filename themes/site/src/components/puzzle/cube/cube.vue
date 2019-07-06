<template>
    <v-obj>
        <v-shape
            :color="0xff0000"
            :geometry="roundedRectangle"
            :position="{ x: -35, y: -10 }"
        />
        <v-shape
            :color="0xffff00"
            :geometry="roundedRectangle"
            :position="{ x: -10, y: -10 }"
        />
        <v-shape
            :color="0x0000ff"
            :geometry="roundedRectangle"
            :position="{ x: 15, y: -10 }"
        />
    </v-obj>
</template>

<script>
import objComponent from '@/components/three/obj/obj.vue';
import shapeComponent from '@/components/three/shape/shape.vue';
import boxComponent from '@/components/three/box/box.vue';
import { roundedRectangle } from '@/components/three/geometries';

export default {
    computed: {
        roundedRectangle() {
            return roundedRectangle(20, 20, 3);
        },
    },
    components: {
        'v-box': boxComponent,
        'v-obj': objComponent,
        'v-shape': shapeComponent,
    },
};
</script>