<script>
import { AmbientLight, PointLight } from 'three';
import { findAncestor } from '@/app/utils/component';
import { noop } from 'lodash-es';

export default {
    created() {
        const scene = findAncestor(this, 'scene');
        const light = this.createLight();

        this.$options.three = {
            light,
        };

        scene.$options.three.scene.add(light);

        this.$on('hook:destroyed', () => {
            scene.$options.three.scene.remove(light);
        });
    },
    methods: {
        createLight() {
            if (this.type === 'ambient') {
                return new AmbientLight(this.color, this.intensity);
            }
            
            if (this.type === 'point') {
                return new PointLight(this.color, this.intensity);
            }
        },
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
        type: {
            default: 'ambient',
            type: String,
            validator(type) {
                return ['ambient', 'point'].includes(type);
            },
        },
    },
    watch: {
        color(color) {
            this.$options.three.light.color.setHex(color);
        },
        intensity(intensity) {
            if (this.$options.three.light) {
                this.$options.three.light.intensity = intensity;
            }
        },
    },
};
</script>
