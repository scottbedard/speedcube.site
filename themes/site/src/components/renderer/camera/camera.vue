<template>
    <p>foo</p>
</template>

<script>
import { PerspectiveCamera } from 'three';
import { findAncestor } from '@/app/utils/component';
import { noop } from 'lodash-es';

export default {
    created() {
        // initialize non-reactive state
        this.$options.camera = new PerspectiveCamera(60, 1, 1, 10000);
        this.registerWithScene();
    },
    methods: {
        registerWithScene() {
            // register our camera with the parent scene, and remove
            // the relationship when this component is destroyed.
            const scene = findAncestor(this, 'scene');

            if (scene) {
                scene.registerCamera(this);

                this.$on('hook:destroyed', scene.unregisterCamera);
            }
        }
    }
};
</script>
