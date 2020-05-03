<script>
import { noop, stubObject } from 'lodash-es';
import { Group, Mesh } from 'three';
import { useNesting, usePosition, useRotation } from 'vue-use-three';
import { watch } from '@vue/composition-api';

export default {
    setup(props) {
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

        useNesting(group);
        usePosition(group, () => props.position);
        useRotation(group, () => props.rotation, { unit: 'degrees' });
    },
    props: {
        geometry: {
            required: true,
            type: Object,
        },
        innerMaterial: {
            type: Object,
        },
        outerMaterial: {
            type: Object,
        },
        position: {
            default: stubObject,
            type: Object,
        },
        rotation: {
            default: stubObject,
            type: Object,
        },
    },
    render: noop,
};
</script>
