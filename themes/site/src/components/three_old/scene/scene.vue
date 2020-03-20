<template>
    <div
        class="absolute h-full w-full"
        @click="onClick"
        @mousemove="onMousemove"
    ><slot /></div>
</template>

<script>
import { Scene, PerspectiveCamera, Raycaster, Vector2 } from 'three';
import base from '../base';
import { degreesToRadians } from '@/app/utils/number';

export default {
    created() {
        // initialize threejs objects
        this.$options.three.camera = new PerspectiveCamera(this.cameraFov, this.cameraAspect, this.cameraNear, this.cameraFar);
        this.$options.three.mouse = new Vector2();
        this.$options.three.obj = new Scene();
        this.$options.three.raycaster = new Raycaster();

        // create a container for threejs objects that require raycasting
        this.$options.raycasterVms = [];

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
        bindMouseEvents(vm) {
            this.$options.raycasterVms.push(vm);

            vm.$once('hook:beforeDestroy', () => {
                this.$options.raycasterVms = this.$options.raycasterVms.filter(registeredVm => registeredVm !== vm);
            });
        },
        disposeScene() {
            const { obj: scene } = this.$options.three;

            scene.dispose();
        },
        onClick(e) {
            // do nothing if we don't require raycasting
            if (this.$options.raycasterVms.length === 0) {
                return;
            }

            const { mouse, raycaster } = this.$options.three;

            // calculate mouse position within our scene in normalized device coordinates
            const { height, left, top, width } = this.$el.getBoundingClientRect();

            mouse.x = ((e.clientX - left) / width) * 2 - 1;
            mouse.y = -((e.clientY - top) / height) * 2 + 1;

            this.$options.raycasterVms.forEach((vm) => {
                // determine what child objects intersect with the ray
                const intersects = raycaster.intersectObject(vm.$options.three.obj);

                // check if we've hit anything
                // @todo: figure out why this is firing on first
                if (intersects.length) {
                    vm.$emit('click', e);
                }
            });
        },
        onMousemove(e) {
            // do nothing if we don't require raycasting
            if (this.$options.raycasterVms.length === 0) {
                return;
            }

            const { mouse, raycaster } = this.$options.three;

            // calculate mouse position within our scene in normalized device coordinates
            const { height, left, top, width } = this.$el.getBoundingClientRect();

            mouse.x = ((e.clientX - left) / width) * 2 - 1;
            mouse.y = -((e.clientY - top) / height) * 2 + 1;

            this.$options.raycasterVms.forEach((vm) => {
                // determine what child objects intersect with the ray
                const intersects = raycaster.intersectObject(vm.$options.three.obj);

                // check if we've hit anything
                // @todo: figure out why this is firing on first
                vm.threeObjHover = intersects.length > 0;
            });
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
