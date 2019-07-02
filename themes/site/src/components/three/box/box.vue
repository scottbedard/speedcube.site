<script>
import { get, noop } from 'lodash-es';
import { findAncestor } from '@/app/utils/component';

import {
    CubeGeometry,
    FrontSide,
    MeshLambertMaterial,
    Mesh,
} from 'three';

export default {
    created() {
        // initialize non-reactive state
        const scene = findAncestor(this, 'scene');

        // create our box geometry
        const { depth, height, width } = this.sizeValues;

        const geometry = new CubeGeometry(height, width, depth);

        const material = new MeshLambertMaterial({
            color: this.color,
            side: FrontSide,
            // wireframe: true,
        });

        const mesh = new Mesh(geometry, material);

        this.$options.three = {
            geometry,
            material,
            mesh,
        };

        scene.$options.three.scene.add(mesh);
    },
    computed: {
        sizeValues() {
            if (typeof this.size === 'object') {
                const depth = Number(get(this.size, 'depth', 0));
                const height = Number(get(this.size, 'height', 0));
                const width = Number(get(this.size, 'width', 0));

                return { depth, height, width };
            }

            return {
                depth: this.size,
                height: this.size,
                width: this.size,
            };
        },
    },
    render: noop,
    props: {
        color: {
            default: 0xff0000,
        },
        size: {
            default: 10,
            type: Number,
        },
    },
    watch: {
        sizeValues: {
            deep: true,
            handler() {
                // @todo: this needs to be improved
                const { mesh } = this.$options.three;
                const { depth, height, width } = this.sizeValues;

                mesh.scale.x = width;
                mesh.scale.y = height;
                mesh.scale.z = depth;
            },
        },
    },
};
</script>
