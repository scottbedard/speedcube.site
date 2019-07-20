<template>
    <canvas
        class="absolute h-full left-0 pointer-events-none top-0 w-full z-10"
        :class="{
            hidden: empty,
        }"
        :height="height"
        :style="{
            transform: `translateY(${scrollY}px)`,
        }"
        :width="width"
    />
</template>

<script>
import { mapState } from 'vuex';
import { bindExternalEvent } from 'spyfu-vue-utils';
import { WebGLRenderer } from 'three';

export default {
    created() {
        // initialize non-reactive state
        this.$options.three = {
            renderer: null,
        };

        this.$options.scenes = [];

        // listen for scroll events on the window
        bindExternalEvent(this, window, 'scroll', () => {
            this.scrollY = window.scrollY;
        });

        // listen for scene events
        this.$root.$on('scene-add', this.addScene);
        this.$root.$on('scene-remove', this.removeScene);
    },
    data() {
        return {
            running: false,
            sceneCount: 0,
            scrollY: window.scrollY,
        };
    },
    mounted() {
        this.$options.three.renderer = new WebGLRenderer({
            alpha: true,
            antialias: true,
            canvas: this.$el,
        });

        this.$options.three.renderer.setClearColor(0x000000, 0);
        this.$options.three.renderer.setPixelRatio(window.devicePixelRatio);
    },
    computed: {
        ...mapState('browser', {
            height: state => state.dimensions.height || 0,
            width: state => state.dimensions.width || 0,
        }),
        empty() {
            return this.sceneCount === 0;
        },
    },
    methods: {
        addScene(vm) {
            this.$options.scenes.push(vm);
            this.sceneCount = this.$options.scenes.length;
        },
        clear() {
            this.$options.three.renderer.setScissorTest(false);
            this.$options.three.renderer.clear();
            this.$options.three.renderer.setScissorTest(true);
        },
        renderScenes() {
            this.updateSize();
            this.clear();

            this.$options.scenes.forEach((scene) => {
                // get its position relative to the page's viewport
                const rect = scene.$el.getBoundingClientRect() || { bottom: 0, top: 0, right: 0, left: 0 };

                // only render visible scenes
                if (
                    rect.bottom < 0
                    || rect.top > document.body.clientHeight
                    || rect.right < 0
                    || rect.left > document.body.clientWidth
                ) {
                    return; // it's off screen
                }

                // set the viewport
                const width = rect.right - rect.left;
                const height = rect.bottom - rect.top;
                const bottom = document.body.clientHeight - rect.bottom;

                this.$options.three.renderer.setViewport(rect.left, bottom, width, height);
                this.$options.three.renderer.setScissor(rect.left, bottom, width, height);

                this.$options.three.renderer.render(
                    scene.$options.three.obj,
                    scene.$options.three.camera,
                );
            });
        },
        removeScene(vm) {
            this.$options.scenes = this.$options.scenes.filter(existing => existing !== vm);
            this.sceneCount = this.$options.scenes.length;
        },
        start() {
            if (!this.running) {
                this.running = true;

                const render = () => {
                    if (this.running) {
                        this.renderScenes();

                        window.requestAnimationFrame(render);
                    }
                };

                render();
            }
        },
        stop() {
            this.running = false;
        },
        updateSize() {
            const width = this.$el.clientWidth;
            const height = this.$el.clientHeight;

            if (this.$el.width !== width || this.$el.height !== height) {
                this.$options.three.renderer.setSize(width, height, false);
            }
        },
    },
    watch: {
        empty(empty) {
            if (empty) {
                this.stop();
            } else {
                this.start();
            }
        },
    },
};
</script>
