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
import { onMounted, ref, watch } from '@vue/composition-api';
import { useRenderer } from 'vue-use-three';
import { getBoundingClientRect, rectIsVisible } from '@/app/utils/dom';

export default {
    setup() {
        let renderer;

        const canvas = ref();
        const running = ref(false);

        const { empty, getScenes } = useRenderer(() => renderer);

        onMounted(() => {
            renderer = new WebGLRenderer({
                alpha: true,
                antialias: true,
                canvas: canvas.value,
            });

            renderer.setClearColor(0x000000, 0);
            renderer.setPixelRatio(window.devicePixelRatio);
        });

        // clear the renderer
        const clear = () => {
            renderer.setScissorTest(false);
            renderer.clear();
            renderer.setScissorTest(true);
        };

        // set the renderer viewport
        const setViewport = (rect) => {
            const width = rect.right - rect.left;
            const height = rect.bottom - rect.top;
            const bottom = document.body.clientHeight - rect.bottom;

            renderer.setViewport(rect.left, bottom, width, height);
            renderer.setScissor(rect.left, bottom, width, height);
        };

        // resize the renderer
        const resize = () => {
            const width = canvas.value.clientWidth;
            const height = canvas.value.clientHeight;

            if (canvas.value.width !== width || canvas.value.height !== height) {
                renderer.setSize(width, height, false);
            }
        };

        // render all scenes within the viewport
        const render = () => {
            if (!renderer || !canvas.value) {
                return;
            }

            resize();
            clear();

            getScenes().forEach((scene) => {
                const rect = getBoundingClientRect(scene.userData.container);

                if (rectIsVisible(rect)) {
                    setViewport(rect);

                    renderer.render(scene, scene.userData.camera);
                    console.log('render');
                }
            });
        };

        // start the raf loop
        const start = () => {
            running.value = true;

            const tick = () => {
                if (running.value) {
                    window.requestAnimationFrame(() => { render(); tick(); });
                }
            };

            tick();
        };

        // stop the raf loop
        const stop = () => {
            running.value = false;
        };

        watch(empty, () => (empty.value ? stop() : start()));

        return {
            canvas,
            empty,
        };
    },
};
</script>
