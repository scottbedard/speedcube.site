<script>
import {
    BackSide,
    FrontSide,
    Group,
    Mesh,
    MeshLambertMaterial,
} from 'three';
import base from '../base';


export default {
    created() {
        // create a mesh for each side of our shape
        const outerMaterial = new MeshLambertMaterial({
            color: this.color,
            side: FrontSide,
        });

        const outerMesh = new Mesh(this.geometry, outerMaterial);

        const innerMaterial = new MeshLambertMaterial({
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
    },
    destroyed() {
        this.disposeGeometries();
    },
    methods: {
        disposeGeometries() {
            const { innerMesh, outerMesh } = this.$options.three;

            innerMesh.geometry.dispose();
            outerMesh.geometry.dispose();
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

            innerMaterial.color.setHex(color);
            outerMaterial.color.setHex(color);
        },
        geometry(geometry) {
            const { innerMesh, outerMesh } = this.$options.three;

            this.disposeGeometries();

            innerMesh.geometry = geometry;
            outerMesh.geometry = geometry;
        },
        innerOpacity(opacity) {
            const { innerMaterial } = this.$options.three;

            innerMaterial.opacity = opacity;
        },
    },
};
</script>
