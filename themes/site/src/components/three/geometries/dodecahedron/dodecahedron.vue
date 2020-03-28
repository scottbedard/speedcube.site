<template>
    <div class="hidden">
        <v-object :position="vertices[2]">
            <slot name="u" />
        </v-object>
    </div>
</template>

<script>
import { DodecahedronGeometry, Mesh, MeshLambertMaterial, Object3D } from 'three';
import { computed } from '@vue/composition-api';
import { threeProps, useDisposable, useThree } from '@/app/behaviors/three';
import objectComponent from '../../object/object.vue';

export default {
    /**
     * Setup.
     *
     * @return {void}
     */
    setup(props, context) {
        const geometry = new DodecahedronGeometry(props.size);

        const material = new MeshLambertMaterial({
            color: 0xaaaaaa,
        });
        
        const mesh = new Mesh(geometry, material);

        const vertices = computed(() => geometry.vertices);

        useDisposable(geometry, material);

        const { getThreeObj } = useThree(mesh, {
            context,
            name: () => props.name,
            position: () => props.position,
            rotation: () => props.rotation,
            scale: () => props.scale,
        });

        return {
            getThreeObj,
            vertices,
        };
    },
    components: {
        'v-object': objectComponent,
    },
    props: {
        ...threeProps,
        size: {
            default: 10,
            type: [Number, Object],
        },
    },
};
</script>
