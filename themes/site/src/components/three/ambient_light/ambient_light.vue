<script>
import { AmbientLight } from 'three';
import { findAncestor } from '@/app/utils/component';
import { noop } from 'lodash-es';

export default {
    created() {
        const scene = findAncestor(this, 'scene');
        const ambientLight = new AmbientLight(this.color, this.intensity);

        this.$options.three = {
            ambientLight,
        };

        scene.$options.three.scene.add(ambientLight);

        this.$on('hook:destroyed', () => {
            scene.$options.three.scene.remove(ambientLight);
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
        },
    },
    watch: {
        color(color) {
            this.$options.three.ambientLight.color.setHex(color);
        },
        intensity(intensity) {
            this.$options.three.ambientLight.intensity = intensity;
        },
    },
};
</script>
