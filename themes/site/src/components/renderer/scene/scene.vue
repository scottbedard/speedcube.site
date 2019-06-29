<template>
    <div>
        <slot />
    </div>
</template>

<script>
import { noop } from 'lodash-es';
import { Scene } from 'three';

export default {
    created() {
        // initialize our non-reactive state
        this.$options.three = {
            camera: null,
            scene: new Scene(),
        };

        this.$root.$emit('scene-created', this);
    },
    destroyed() {
        this.$root.$emit('scene-destroyed', this);
    },
    methods: {
        registerCamera(vm) {
            this.$options.three.camera = vm.$options.camera;
        },
        unregisterCamera() {
            this.$options.three.camera = null;
        },
    },
    name: 'scene',
};
</script>
