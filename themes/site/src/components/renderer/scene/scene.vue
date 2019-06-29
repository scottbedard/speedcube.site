<template>
    <div>
        <slot />
    </div>
</template>

<script>
import { noop } from 'lodash-es';

export default {
    created() {
        this.$root.$emit('scene-created', this);
    },
    data() {
        return {
            camera: null,
        };
    },
    destroyed() {
        this.$root.$emit('scene-destroyed', this);
    },
    methods: {
        registerCamera(vm) {
            this.camera = vm;
        },
        unregisterCamera(vm) {
            this.camera = null;
        },
    },
    name: 'scene',
};
</script>
