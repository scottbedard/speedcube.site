<template>
    <div class="absolute h-full w-full" @mousemove="onMousemove"><slot /></div>
</template>

<script>
import { Scene, PerspectiveCamera, Raycaster, Vector2 } from 'three';
import base from '../base';
import { degreesToRadians } from '@/app/utils/number';

export default {
    created() {
        this.$options.three.camera = new PerspectiveCamera(this.cameraFov, this.cameraAspect, this.cameraNear, this.cameraFar);
        this.$options.three.mouse = new Vector2();
        this.$options.three.obj = new Scene();
        this.$options.three.raycaster = new Raycaster();

        this.syncCameraPosition();
    },
    mounted() {
        this.$root.$emit('scene-add', this);
    },
    destroyed() {
        this.$root.$emit('scene-remove', this);

        this.disposeScene();
    },
    computed: {
        cameraPosition() {
            const angle = degreesToRadians(this.cameraAngle);
            const adjacent = Math.sin(angle) * this.cameraDistance;
            const opposite = Math.cos(angle) * this.cameraDistance;

            return { opposite, adjacent };
        },
    },
    methods: {
        disposeScene() {
            const { obj: scene } = this.$options.three;

            scene.dispose();
        },
        onMousemove(e) {
            const { mouse, raycaster, obj: scene } = this.$options.three;

            // determine what child objects intersect with the ray
            const intersects = raycaster.intersectObjects(scene.children);

            // calculate mouse position within our scene, in normalized device coordinates
            const { height, left, top, width } = this.$el.getBoundingClientRect();

            mouse.x = ((e.clientX - left) / width) * 2 - 1;
            mouse.y = -((e.clientY - top) / height) * 2 + 1;

            // check if we've hit anything
            // @todo: figure out why this is firing on first
            if (intersects.length) {
                console.log('intersecting', intersects[0]);
            }
        },
        syncCameraPosition() {
            const { camera } = this.$options.three;
            const { opposite, adjacent } = this.cameraPosition;

            camera.position.set(0, opposite, adjacent);
            camera.lookAt(0, 0, 0);
        },
    },
    mixins: [
        base,
    ],
    name: 'scene',
    props: {
        cameraAngle: {
            default: 0,
            type: Number,
        },
        cameraAspect: {
            default: 1,
            type: Number,
        },
        cameraDistance: {
            default: 0,
            type: Number,
        },
        cameraFar: {
            default: 10000,
            type: Number,
        },
        cameraFov: {
            default: 60,
            type: Number,
        },
        cameraNear: {
            default: 1,
            type: Number,
        },
    },
    watch: {
        cameraPosition: 'syncCameraPosition',
    },
};
</script>
