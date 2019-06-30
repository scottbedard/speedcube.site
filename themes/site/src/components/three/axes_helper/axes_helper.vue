AxesHelper

<script>
import { noop } from 'lodash-es';
import { findAncestor } from '@/app/utils/component';
import { AxesHelper } from 'three';

export default {
    created() {
        const scene = findAncestor(this, 'scene');
        const axesHelper = new AxesHelper(this.size);

        // add to scene
        scene.$options.three.scene.add(axesHelper);

        // remove from scene
        this.$on('hook:destroyed', () => {
            scene.$options.three.scene.remove(axesHelper);
        });

        // store our non-reactive state for later use
        this.$options.three = {
            axesHelper
        };
    },
    render: noop,
    props: {
        size: {
            default: 100,
            type: Number,
        },
    },
};
</script>