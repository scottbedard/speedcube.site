<script>
import { noop } from 'lodash-es';
import { findAncestor } from '@/app/utils/component';
import { MeshLambertMaterial, Object3D } from 'three';

export default {
    created() {
        const scene = findAncestor(this, 'scene');
        const obj = new Object3D();

        this.$options.three = {
            obj,
            // innerMaterial,
            // outerMaterial,
        };

        // add object to scene
        scene.$options.three.scene.add(obj);

        // remove object from scene
        this.$on('hook:destroyed', () => {
            scene.$options.three.scene.remove(obj);
        });
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
};
</script>