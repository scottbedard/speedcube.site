<script>
import { Group, Mesh } from 'three';
import base from '../base';

export default {
    created() {
        const innerMesh = new Mesh(this.geometry, this.innerMaterial);
        const outerMesh = new Mesh(this.geometry, this.outerMaterial);

        const group = new Group();
        group.add(innerMesh);
        group.add(outerMesh);

        this.$options.three.obj = group;
        this.$options.three.innerMesh = innerMesh;
        this.$options.three.outerMesh = outerMesh;
    },
    methods: {
        syncGeometry() {
            if (this.$options.three.innerMesh) {
                this.$options.three.innerMesh.geometry = this.geometry;
            }

            if (this.$options.three.outerMesh) {
                this.$options.three.outerMesh.geometry = this.geometry;
            }
        },
    },
    mixins: [
        base,
    ],
    props: [
        'geometry',
        'innerMaterial',
        'outerMaterial',
    ],
    watch: {
        geometry: 'syncGeometry',
    },
};
</script>
