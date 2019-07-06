<template>
    <v-obj>
        <v-shape
            :color="0xff0000"
            :geometry="roundedRectangle"
            :position="{ x: -35, y: -10, z: 20 }"
        />
        <v-obj :rotation="rotation">
            <v-shape
                :color="0xffff00"
                :geometry="roundedRectangle"
                :position="{ x: -10, y: -10, z: 20 }"
            />
            <v-shape
                :color="0x0000ff"
                :geometry="roundedRectangle"
                :position="{ x: 15, y: -10, z: 20 }"
            />
        </v-obj>
    </v-obj>
</template>

<script>
import objComponent from '@/components/three/obj/obj.vue';
import shapeComponent from '@/components/three/shape/shape.vue';
import boxComponent from '@/components/three/box/box.vue';
import { roundedRectangle } from '@/components/three/geometries';

export default {
    components: {
        'v-box': boxComponent,
        'v-obj': objComponent,
        'v-shape': shapeComponent,
    },
    computed: {
        roundedRectangle() {
            return roundedRectangle(20, 20, 3);
        },
        rotation() {
            return {
                x: 90 * this.turnProgress,
            }
        },
    },
    props: {
        currentTurn: {
            type: String,
        },
        turnProgress: {
            default: 0,
            type: Number,
        },
    },
    watch: {
        
    },
};
</script>