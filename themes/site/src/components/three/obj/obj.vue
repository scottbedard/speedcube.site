<template>
    <div class=""><slot /></div>
</template>

<script>
import { Object3D } from 'three';
import base from '../base';

export default {
    created() {
        this.$options.three.obj = this.obj || new Object3D();
    },
    mixins: [
        base,
    ],
    props: {
        obj: {
            type: Object,
        },
    },
};
</script>
