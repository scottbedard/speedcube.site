<template>
    <canvas
        class="absolute h-full left-0 pointer-events-none top-0 w-full z-10"
        :class="{
            hidden: empty,
        }"
        :height="height"
        :style="{
            transform: `translateY(${scrollPosition.y}px)`,
        }"
        :width="width"
    />
</template>

<script>
import { pull } from 'lodash-es';
import { WebGLRenderer } from 'three';
import { mapState } from 'vuex';
import { useScrollPosition } from '@/app/behaviors/scroll_position';

export default {
    /**
     * Created.
     *
     * @return {void}
     */
    created() {
        this.$options.scenes = [];

        this.$root.$on('scene-add', this.addScene);
        this.$root.$on('scene-remove', this.removeScene);
    },

    /**
     * Data.
     *
     * @return {object}
     */
    data() {
        return {
            running: false,
            sceneCount: 0,
        };
    },

    /**
     * Mounted.
     *
     * @return {void}
     */
    mounted() {
        const renderer = new WebGLRenderer({
            alpha: true,
            antialias: true,
            canvas: this.$el,
        });

        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(window.devicePixelRatio);
    },

    /**
     * Setup.
     *
     * @return {object}
     */
    setup() {
        const { scrollPosition } = useScrollPosition();

        return { scrollPosition };
    },
    computed: {
        ...mapState('browser', {
            height: state => state.dimensions.height || 0,
            width: state => state.dimensions.width || 0,
        }),

        /**
         * Determine if there are any scenes to render.
         *
         * @return {boolean}
         */
        empty() {
            return this.sceneCount === 0;
        },
    },
    methods: {
        /**
         * Add a scene to be rendered.
         *
         * @param {Scene}   scene
         *
         * @return {void}
         */
        addScene(scene) {
            this.$options.scenes.push(scene);

            this.count();
        },

        /**
         * Count the number of scenes.
         *
         * @return {void}
         */
        count() {
            this.sceneCount = this.$options.scenes.length;
        },

        /**
         * Draw all scenes in the viewport.
         *
         * @return {void}
         */
        draw() {
            console.log('drawing');
        },

        /**
         * Remove a scene from the renderer.
         *
         * @param {Scene}   scene
         *
         * @return {void}
         */
        removeScene(scene) {
            pull(this.$options.scenes, scene);

            this.count();
        },

        /**
         * Start rendering.
         *
         * @return {void}
         */
        start() {
            if (!this.running) {
                this.running = true;

                const draw = () => {
                    if (this.running) {
                        this.draw();
                        window.requestAnimationFrame(draw);
                    }
                };

                draw();
            }
        },

        /**
         * Stop rendering.
         *
         * @return {void}
         */
        stop() {
            this.running = false;
        },
    },
    watch: {
        /**
         * Start/stop the renderer.
         *
         * @param {boolean} empty
         *
         * @return {void}
         */
        empty(empty) {
            if (empty) this.stop();
            else this.start();
        },
    },
};
</script>
