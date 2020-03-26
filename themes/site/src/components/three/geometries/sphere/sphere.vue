<script>
import { noop } from 'lodash-es';
import { Mesh, MeshBasicMaterial, SphereGeometry } from 'three';
import { useThree } from '@/app/behaviors/three/base';
import { hexColorValue } from '@/app/utils/string';

export default {
    setup(props, context) {
        const geometry = new SphereGeometry(props.radius, props.segments, props.segments);

        const material = new MeshBasicMaterial({
            color: hexColorValue(props.color),
            wireframe: props.wireframe,
        });

        const sphere = new Mesh(geometry, material);

        const { getThreeObj } = useThree(sphere, {
            context,
        });

        return { getThreeObj };
    },
    render: noop,
    props: {
        color: {
            default: 'fff',
            type: String,
        },
        radius: {
            default: 5,
            type: Number,
        },
        segments: {
            default: 30,
            type: Number,
        },
        wireframe: {
            default: true,
            type: Boolean,
        },
    },
};
</script>
