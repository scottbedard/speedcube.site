<script>
import { get } from 'lodash-es';

import {
    CubeGeometry,
    FrontSide,
    MeshLambertMaterial,
    Mesh,
} from 'three';

import base from '../base';

export default {
    created() {
        // create our box geometry
        const { depth, height, width } = this.sizeValues;

        const geometry = new CubeGeometry(height, width, depth);

        const material = new MeshLambertMaterial({
            color: this.color,
            side: FrontSide,
            // wireframe: true,
        });

        const mesh = new Mesh(geometry, material);

        this.$options.three.geometry = geometry;
        this.$options.three.material = material;
        this.$options.three.obj = mesh;
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
    mixins: [
        base,
    ],
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
