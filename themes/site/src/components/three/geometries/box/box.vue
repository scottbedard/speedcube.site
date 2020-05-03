<template>
    <v-group :position="position" :rotation="rotation">
        <v-group :position="{ y: y / 2 }" :rotation="{ x: -90 }">
            <!-- <v-axes-helper /> -->
            <slot name="u" />
        </v-group>
        <!-- <v-group :position="{ x: x / -2 }" :rotation="{ }">
            <slot name="l" />
        </v-group>
        <v-group :position="{ z: z / 2 }">
            <slot name="f" />
        </v-group>
        <v-group :position="{ x: x / 2 }" :rotation="{ }">
            <slot name="r" />
        </v-group>
        <v-group :position="{ z: z / -2 }" :rotation="{ }">
            <slot name="b" />
        </v-group>
        <v-group :position="{ y: y / -2 }" :rotation="{ }">
            <slot name="d" />
        </v-group> -->
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
