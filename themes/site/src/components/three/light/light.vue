<script>
import { AmbientLight, PointLight } from 'three';
import base from '../base';

export default {
    created() {
        this.$options.three.obj = this.createLight();
    },
    methods: {
        createLight() {
            if (this.type === 'point') {
                return new PointLight(this.color, this.intensity);
            }

            // default to ambient
            return new AmbientLight(this.color, this.intensity);
        },
    },
    mixins: [
        base,
    ],
    props: {
        color: {
            default: 0xffffff,
            type: Number,
        },
        intensity: {
            default: 0.5,
            type: Number,
        },
        position: {
            default: () => ({ x: 0, y: 0, z: 0 }),
            type: Object,
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
            this.$options.three.obj.color.setHex(color);
        },
        intensity(intensity) {
            this.$options.three.obj.intensity = intensity;
        },
    },
};
</script>
