<template>
    <div ref="el">
        <slot />
        <canvas
            class="border-4 border-danger-5 fixed h-full left-0 pointer-events-none top-0 w-full z-10"
            ref="canvas"
            :class="{
                hidden: empty,
            }"
        />
    </div>
</template>

<script>
import { WebGLRenderer } from 'three';
import { onMounted, ref } from '@vue/composition-api';
import { useRenderer } from 'vue-use-three';

export default {
    setup() {
        let renderer;

        const canvas = ref();

        const { empty } = useRenderer(() => renderer);

        onMounted(() => {
            renderer = new WebGLRenderer({
                alpha: true,
                antialias: true,
                canvas: canvas.value,
            });

            renderer.setClearColor(0x000000, 0);
            renderer.setPixelRatio(window.devicePixelRatio);
        });

        return {
            canvas,
            empty,
        };
    },
};
</script>
