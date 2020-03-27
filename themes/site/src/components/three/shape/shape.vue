<script>
import { noop } from 'lodash-es';
import { Group, Mesh } from 'three';
import { watch } from '@vue/composition-api';
import { threeProps, useThree } from '@/app/behaviors/three';

export default {
    /**
     * Setup.
     *
     * @return {void}
     */
    setup(props, context) {
        const group = new Group();

        if (props.innerMaterial) {
            const innerMesh = new Mesh(props.geometry, props.innerMaterial);

            group.add(innerMesh);

            watch(() => props.innerMaterial, () => {
                innerMesh.material = props.innerMaterial;
            });

            watch(() => props.geometry, () => {
                innerMesh.geometry = props.geometry;
            });
        }

        if (props.outerMaterial) {
            const outerMesh = new Mesh(props.geometry, props.outerMaterial);

            group.add(outerMesh);

            watch(() => props.outerMaterial, () => {
                outerMesh.material = props.outerMaterial;
            });

            watch(() => props.geometry, () => {
                outerMesh.geometry = props.geometry;
            });
        }

        const { getThreeObj } = useThree(group, {
            context,
            position: () => props.position,
            rotation: () => props.rotation,
            scale: () => props.scale,
        });

        return { getThreeObj };
    },
    render: noop,
    props: {
        ...threeProps,
        geometry: Object,
        innerMaterial: Object,
        outerMaterial: Object,
    },
};
</script>
