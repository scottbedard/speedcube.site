<script>
import { noop } from 'lodash-es';
import { Mesh, MeshBasicMaterial, SphereGeometry } from 'three';
import { threeProps, useDisposable, useThree } from '@/app/behaviors/three/index';
import { hexColorValue } from '@/app/utils/string';

export default {
    setup(props, context) {
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

        useThree(mesh, {
            context,
            name: () => props.name,
            position: () => props.position,
            rotation: () => props.rotation,
            scale: () => props.scale,
        });
    },
    render: noop,
    props: {
        ...threeProps,
        color: {
            default: 'fff',
            type: String,
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
