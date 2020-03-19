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
import { mapState } from 'vuex';
import { useScrollPosition } from '@/app/behaviors/scroll_position';

export default {
    setup() {
        const { scrollPosition } = useScrollPosition();

        return { scrollPosition };
    },
    computed: {
        ...mapState('browser', {
            height: state => state.dimensions.height || 0,
            width: state => state.dimensions.width || 0,
        }),
        empty() {
            return false;
        },
    },
};
</script>
