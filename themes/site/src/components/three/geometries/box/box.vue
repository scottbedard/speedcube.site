<template>
    <v-group :position="position" :rotation="rotation">
        <v-group :position="{ y: y / 2 }" :rotation="{ x: -90 }">
            <slot name="U" />
        </v-group>
        <v-group :position="{ x: x / -2 }" :rotation="{ y: -90 }">
            <slot name="L" />
        </v-group>
        <v-group :position="{ z: z / 2 }">
            <slot name="F" />
        </v-group>
        <v-group :position="{ x: x / 2 }" :rotation="{ y: 90 }">
            <slot name="R" />
        </v-group>
        <v-group :position="{ z: z / -2 }" :rotation="{ y: 180 }">
            <slot name="B" />
        </v-group>
        <v-group :position="{ y: y / -2 }" :rotation="{ x: 90 }">
            <slot name="D" />
        </v-group>
    </v-group>
</template>

<script>
import { isPlainObject, stubObject } from 'lodash-es';
import axesHelperComponent from '../../axes_helper/axes_helper.vue';
import groupComponent from '../../group/group.vue';

export default {
    components: {
        'v-axes-helper': axesHelperComponent,
        'v-group': groupComponent,
    },
    computed: {
        x() {
            return isPlainObject(this.size) ? this.size.x : this.size;
        },
        y() {
            return isPlainObject(this.size) ? this.size.y : this.size;
        },
        z() {
            return isPlainObject(this.size) ? this.size.z : this.size;
        },
    },
    props: {
        position: {
            default: stubObject,
            type: Object,
        },
        rotation: {
            default: stubObject,
            type: Object,
        },
        size: {
            default: 10,
            type: [Number, Object],
        },
    },
};
</script>
