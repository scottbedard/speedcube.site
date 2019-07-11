<template>
    <div class="hidden"><slot /></div>
</template>

<script>
import { Object3D } from 'three';
import base from '../base';

export default {
    created() {
        this.$options.three.obj = new Object3D();
    },
    mixins: [
        base,
    ],
};
</script>
