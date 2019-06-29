<template>
    <canvas
        class="absolute h-full pin-l pin-t pointer-events-none w-full"
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
        this.$root.$on('scene-created', this.addScene);
        this.$root.$on('scene-destroyed', this.removeScene);
    },
    data() {
        return {
            scenes: [],
            scrollY: window.scrollY,
        };
    },
    mounted() {
        this.$options.three.renderer = new WebGLRenderer({
            antialias: true,
            canvas: this.$el,
        });
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
        removeScene(scene) {
            this.scenes = this.scenes.filter(existing => existing !== scene);
        },
    },
};
</script>
