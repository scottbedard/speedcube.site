<script>
import base from '../base';

import {
    BackSide,
    FrontSide,
    Group,
    Mesh,
    MeshLambertMaterial,
} from 'three';

export default {
    created() {
        this.refreshGroup();
    },
    methods: {
        refreshGroup() {
            this.removeFromParentObj();

            // create a mesh for each side of our shape
            const outerMaterial = this.createMaterial({
                color: this.color,
                side: FrontSide,
            });

            const outerMesh = new Mesh(this.geometry, outerMaterial);

            const innerMaterial = this.createMaterial({
                color: this.color,
                opacity: this.innerOpacity,
                side: BackSide,
                transparent: true,
            });

            const innerMesh = new Mesh(this.geometry, innerMaterial);

            // create an object to attach our meshes to
            const group = new Group();

            group.add(outerMesh);
            group.add(innerMesh);

            this.$options.three.obj = group;
            this.$options.three.innerMaterial = innerMaterial;
            this.$options.three.innerMesh = innerMesh;
            this.$options.three.outerMaterial = outerMaterial;
            this.$options.three.outerMesh = outerMesh;

            this.addToParentObj();
        },
        createMaterial(options = {}) {
            return new MeshLambertMaterial(options);
        },
    },
    mixins: [
        base,
    ],
    props: {
        color: {
            default: 0xffffff,
            type: Number,
        },
        innerOpacity: {
            default: 0.8,
            type: Number,
        },
        geometry: {
            required: true,
        },
        outerOpacity: {
            default: 1,
            type: Number,
        },
    },
    watch: {
        color(color) {
            const { innerMaterial, outerMaterial } = this.$options.three;

            if (innerMaterial && outerMaterial) {
                innerMaterial.color.setHex(color);
                outerMaterial.color.setHex(color);
            }
        },
        geometry() {
            this.refreshGroup();
        },
        innerOpacity(opacity) {
            const { innerMaterial } = this.$options.three;

            if (innerMaterial) {
                innerMaterial.opacity = opacity;
            }
        },
    },
};
</script>
