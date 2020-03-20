<template>
    <canvas
        class="absolute h-full left-0 pointer-events-none top-0 w-full z-10"
        :class="{
            hidden: false,
        }"
        :height="height"
        :style="{
            transform: `translateY(${scrollPosition.y}px)`,
        }"
        :width="width"
    />
</template>

<script>
import { WebGLRenderer } from 'three';
import { mapState } from 'vuex';
import { useScrollPosition } from '@/app/behaviors/scroll_position';
import { useThree } from '@/app/behaviors/three';

export default {
    setup() {
        const { scrollPosition } = useScrollPosition();
        const { getThreeObj, setThreeObj } = useThree();

        return {
            getThreeObj,
            scrollPosition,
            setThreeObj,
        };
    },
    mounted() {
        const renderer = new WebGLRenderer({
            alpha: true,
            antialias: true,
            canvas: this.$el,
        });

        renderer.setClearColor(0x000000, 0);

        renderer.setPixelRatio(window.devicePixelRatio);

        this.setThreeObj(renderer);
    },
    computed: {
        ...mapState('browser', {
            height: state => state.dimensions.height || 0,
            width: state => state.dimensions.width || 0,
        }),
    },
};
</script>
