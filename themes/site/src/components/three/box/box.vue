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
    },
};
</script>