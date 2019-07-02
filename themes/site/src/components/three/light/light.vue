<script>
/* eslint-disable consistent-return */
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

        // set light position
        const { x, y, z } = this.position;

        light.position.set(x, y, z);

        // add light to scene
        scene.$options.three.scene.add(light);

        // remove light from scene
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
            this.$options.three.light.color.setHex(color);
        },
        intensity(intensity) {
            if (this.$options.three.light) {
                this.$options.three.light.intensity = intensity;
            }
        },
        position({ x, y, z }) {
            this.$options.three.light.position.set(x, y, z);
        },
    },
};
</script>
