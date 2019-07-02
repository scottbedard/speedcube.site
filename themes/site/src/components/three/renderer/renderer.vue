<template>
    <canvas
        class="absolute h-full pin-l pin-t pointer-events-none w-full"
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
            scenes: [],
            scrollY: window.scrollY,
        };
    },
    mounted() {
        this.$options.three.renderer = new WebGLRenderer({
            alpha: true,
            antialias: true,
            canvas: this.$el,
        });

        this.$options.three.renderer.setPixelRatio(window.devicePixelRatio);
    },
    computed: {
        ...mapState('browser', {
            height: state => state.dimensions.height || 0,
            width: state => state.dimensions.width || 0,
        }),
        empty() {
            return this.scenes.length === 0;
        },
    },
    methods: {
        addScene(scene) {
            this.scenes.push(scene);
        },
        clear() {
            this.$options.three.renderer.setScissorTest(false);
            this.$options.three.renderer.clear();
            this.$options.three.renderer.setScissorTest(true);
        },
        renderScenes() {
            let cleared = false;

            this.updateSize();

            this.scenes.forEach((scene) => {
                // get its position relative to the page's viewport
                const rect = scene.$el.getBoundingClientRect();

                // only render visible scenes
                if (
                    rect.bottom < 0
                    || rect.top > document.body.clientHeight
                    || rect.right < 0
                    || rect.left > document.body.clientWidth
                ) {
                    return; // it's off screen
                }

                // @todo: this causes a flicker, find better way to prevent artifacts
                if (!cleared) {
                    cleared = true;

                    this.clear();
                }

                // set the viewport
                const width = rect.right - rect.left;
                const height = rect.bottom - rect.top;
                const bottom = document.body.clientHeight - rect.bottom;

                this.$options.three.renderer.setViewport(rect.left, bottom, width, height);
                this.$options.three.renderer.setScissor(rect.left, bottom, width, height);

                this.$options.three.renderer.render(
                    scene.$options.three.scene,
                    scene.$options.three.camera,
                );
            });
        },
        removeScene(scene) {
            this.scenes = this.scenes.filter(existing => existing !== scene);
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
