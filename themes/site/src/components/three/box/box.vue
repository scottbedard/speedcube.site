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
        // create our box geometry, and cache the original size
        this.originalSize = this.sizeValues;

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
    data() {
        return {
            originalSize: { depth: 0, height: 0, width: 0 },
        };
    },
    destroyed() {
        this.disposeGeometry();
        this.disposeMaterial();
    },
    computed: {
        sizeValues() {
            if (typeof this.size === 'object') {
                const depth = get(this.size, 'depth', 0);
                const height = get(this.size, 'height', 0);
                const width = get(this.size, 'width', 0);

                return { depth, height, width };
            }

            return {
                depth: this.size,
                height: this.size,
                width: this.size,
            };
        },
    },
    methods: {
        disposeGeometry() {
            const { geometry } = this.$options.three;

            geometry.dispose();
        },
        disposeMaterial() {
            const { material } = this.$options.three;

            material.dispose();
        },
    },
    mixins: [
        base,
    ],
    props: {
        color: {
            default: 0xffffff,
        },
        size: {
            default: 10,
            type: [Number, Object],
        },
    },
    watch: {
        color(color) {
            const { material } = this.$options.three;

            material.color.setHex(color);
        },
        size() {
            const { depth, height, width } = this.sizeValues;
            const { obj } = this.$options.three;

            obj.scale.x = width / this.originalSize.width;
            obj.scale.y = height / this.originalSize.height;
            obj.scale.z = depth / this.originalSize.depth;
        },
    },
};
</script>
