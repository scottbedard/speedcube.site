<template>
    <div><slot /></div>
</template>

<script>
import base from '../base';
import { Object3D } from 'three';

export default {
    created() {
        this.$options.three.obj = new Object3D();
    },
    mixins: [
        base,
    ],
};
</script>