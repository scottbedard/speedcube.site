<script>
import { noop, stubObject } from 'lodash-es';
import { Mesh, MeshBasicMaterial, SphereGeometry } from 'three';
import { useDisposable, useNesting, usePosition } from 'vue-use-three';
import { hexColorValue } from '@/app/utils/string';

export default {
    setup(props) {
        const geometry = new SphereGeometry(
            props.radius,
            props.segments,
            props.segments,
        );

        const material = new MeshBasicMaterial({
            color: hexColorValue(props.color),
            wireframe: props.wireframe,
        });

        const mesh = new Mesh(geometry, material);

        useDisposable(geometry, material);

        usePosition(mesh, () => props.position);

        useNesting(mesh);
    },
    render: noop,
    props: {
        color: {
            default: 'fff',
            type: String,
        },
        position: {
            default: stubObject,
            type: Object,
        },
        radius: {
            default: 2,
            type: Number,
        },
        segments: {
            default: 10,
            type: Number,
        },
        wireframe: {
            default: true,
            type: Boolean,
        },
    },
};
</script>
