<script>
import { AmbientLight } from 'three';
import { findAncestor } from '@/app/utils/component';
import { noop } from 'lodash-es';

export default {
    created() {
        const scene = findAncestor(this, 'scene');

        this.$options.three = {
            ambientLight: new AmbientLight(this.color, this.intensity),
        };

        scene.$options.three.scene.add(this.$options.three.ambientLight);

        this.$on('hook:destroyed', () => {

        });
    },
    render: noop,
    props: {
        color: {
            default: 0xffffff,
            type: Number,
        },
        intensity: {
            default: 0.5,
            type: Number,
        }
    }
};
</script>
