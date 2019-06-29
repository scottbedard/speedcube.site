<script>
import { PerspectiveCamera } from 'three';
import { findAncestor } from '@/app/utils/component';
import { noop } from 'lodash-es';
import { degreesToRadians } from '@/app/utils/number';

export default {
    created() {
        const scene = findAncestor(this, 'scene');
        const camera = new PerspectiveCamera(50, 1, 1, 10);

        this.$options.three = {
            camera,
        };

        this.position();

        // register our camera with the parent scene, and remove
        // the relationship when this component is destroyed.
        if (scene) {
            scene.registerCamera(camera);

            this.$on('hook:destroyed', scene.unregisterCamera);
        }
    },
    methods: {
        position() {
            const { camera } = this.$options.three;

            const angle = degreesToRadians(this.angle);
            const adjacent = Math.sin(angle) * this.distance;
            const opposite = Math.cos(angle) * this.distance;

            camera.position.set(0, opposite, adjacent);
            camera.lookAt(0, 0, 0);
        },
    },
    props: {
        angle: {
            default: 0,
            type: Number,
        },
        distance: {
            default: 2,
            type: Number,
        },
    },
    render: noop,
    watch: {
        angle: 'position',
        distance: 'position',
    },
};
</script>
