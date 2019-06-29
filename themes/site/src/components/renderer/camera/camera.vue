<template>
    <p>foo</p>
</template>

<script>
import { noop } from 'lodash-es';
import { findAncestor } from '@/app/utils/component';

export default {
    created() {
        this.registerWithScene();
    },
    data() {
        return {
            scene: undefined,
        };
    },
    methods: {
        registerWithScene() {
            // register our camera with the parent scene, and remove
            // the relationship when this component is destroyed.
            const scene = findAncestor(this, 'scene');

            if (scene) {
                scene.registerCamera(this);
                this.$on('hook:destroyed', () => scene.unregisterCamera(this));
            }
        }
    }
};
</script>
