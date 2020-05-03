<template>
    <div>
        <slot />
    </div>
</template>

<script>
import { stubObject } from 'lodash-es';
import { Group } from 'three';
import { useNesting, usePosition, useRotation } from 'vue-use-three';

export default {
    setup(props) {
        const group = new Group();

        usePosition(group, () => props.position);
        useRotation(group, () => props.rotation, { unit: 'degrees' });
        useNesting(group);
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
    },
};
</script>
