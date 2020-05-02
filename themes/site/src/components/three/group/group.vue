<template>
    <div>
        <slot />
    </div>
</template>

<script>
import { Group } from 'three';
import { useNesting } from 'vue-use-three';

export default {
    setup() {
        const group = new Group();

        useNesting(group);
    },
};
</script>
