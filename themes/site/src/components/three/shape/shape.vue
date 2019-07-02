<script>
import { noop } from 'lodash-es';
import { findAncestor } from '@/app/utils/component';
import {
    BackSide,
    FrontSide,
    Group,
    Mesh,
    MeshBasicMaterial,
    MeshLambertMaterial,
    MeshPhongMaterial,
} from 'three';

export default {
    created() {
        this.$options.three = {
            group: null,
            innerMaterial: null,
            innerMesh: null,
            outerMaterial: null,
            outerMesh: null,
        };

        // create our mesh group and add to scene
        this.refreshGroup();

        // remove object from scene
        this.$on('hook:destroyed', () => this.removeGroup());
    },
    methods: {
        addGroup() {
            const scene = findAncestor(this, 'scene');
            const { group } = this.$options.three;

            if (scene && group) {
                scene.$options.three.scene.add(group);
            }
        },
        refreshGroup() {
            this.removeGroup();

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

            this.$options.three.group = group;
            this.$options.three.innerMaterial = innerMaterial;
            this.$options.three.innerMesh = innerMesh;
            this.$options.three.outerMaterial = outerMaterial;
            this.$options.three.outerMesh = outerMesh;

            this.addGroup();
        },
        createMaterial(options = {}) {
            if (this.material === 'lambert') {
                return new MeshLambertMaterial(options);
            }

            if (this.material === 'phong') {
                return new MeshPhongMaterial(options);
            }

            return new MeshBasicMaterial(options);
        },
        removeGroup() {
            const scene = findAncestor(this, 'scene');
            const { group } = this.$options.three;

            if (scene && group) {
                scene.$options.three.scene.remove(group);
            }
        },
    },
    render: noop,
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
        material: {
            default: 'lambert',
            type: String,
            validator(material) {
                return ['basic', 'lambert', 'phong'].includes(material);
            },
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
