<script>
import { noop } from 'lodash-es';
import { Group, Mesh } from 'three';
import { threeProps, useThree } from '@/app/behaviors/three';

export default {
    /**
     * Setup.
     *
     * @return {void}
     */
    setup(props, context) {
        const innerMesh = new Mesh(props.geometry, props.innerMaterial);
        const outerMesh = new Mesh(props.geometry, props.outerMaterial);

        const group = new Group();
        group.add(innerMesh);
        group.add(outerMesh);

        const { getThreeObj } = useThree(group, {
            context,
            position: () => props.position,
            rotation: () => props.rotation,
            scale: () => props.scale,
        });

        return { getThreeObj };
    },
    render: noop,
    methods: {
        // syncGeometry() {
        //     if (this.$options.three.innerMesh) {
        //         this.$options.three.innerMesh.geometry = this.geometry;
        //     }

        //     if (this.$options.three.outerMesh) {
        //         this.$options.three.outerMesh.geometry = this.geometry;
        //     }
        // },
        // syncInnerMesh() {
        //     const { innerMesh } = this.$options.three;

        //     innerMesh.material = this.innerMaterial;
        // },
        // syncOuterMesh() {
        //     const { outerMesh } = this.$options.three;

        //     outerMesh.material = this.outerMaterial;
        // },
    },
    props: {
        ...threeProps,
        geometry: Object,
        innerMaterial: Object,
        outerMaterial: Object,
    },
    watch: {
        // geometry: 'syncGeometry',
        // innerMaterial: 'syncInnerMesh',
        // outerMaterial: 'syncOuterMesh',
    },
};
</script>
