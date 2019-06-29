<script>
import { noop } from 'lodash-es';
import { findAncestor } from '@/app/utils/component';

import {
    BoxBufferGeometry,
    MeshStandardMaterial,
    Mesh,
} from 'three';

export default {
    created() {
        // initialize non-reactive state
        const scene = findAncestor(this, 'scene');

        // @todo: accept an object and destructure these values
        const width = this.size;
        const height = this.size;
        const depth = this.size;

        const geometry = new BoxBufferGeometry(width, height, depth);

        const material = new MeshStandardMaterial({
            color: this.color,
            roughness: 0.5,
            metalness: 0,
            flatShading: true,
        });

        const mesh = new Mesh(geometry, material);

        this.$options.three = {
            geometry,
            mesh,
        };
        
        scene.$options.three.scene.add(mesh);
    },
    render: noop,
    props: {
        color: {
            default: 0xff0000,
        },
    },
};
</script>
