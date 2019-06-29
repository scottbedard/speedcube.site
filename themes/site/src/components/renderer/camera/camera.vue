<script>
import { PerspectiveCamera } from 'three';
import { findAncestor } from '@/app/utils/component';
import { noop } from 'lodash-es';

export default {
    created() {
        // initialize non-reactive state
        this.$options.scene = findAncestor(this, 'scene');

        this.$options.three = {
            camera: new PerspectiveCamera(60, 1, 1, 10000),
        };

        // register our camera with the parent scene, and remove
        // the relationship when this component is destroyed.
        if (this.$options.scene) {
            this.$options.scene.registerCamera(this.$options.three.camera);

            this.$on('hook:destroyed', this.$options.scene.unregisterCamera);
        }
    },
    render: noop,
};
</script>
