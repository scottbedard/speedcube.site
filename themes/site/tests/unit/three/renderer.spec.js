/* eslint-disable */
import sceneComponent from '@/components/three_old/scene/scene.vue';
import rendererComponent from '@/components/three_old/renderer/renderer.vue';
import { WebGLRenderer } from 'three';

//
// mocks
//
jest.mock('three', () => {
    const three = require.requireActual('three');

    return {
        ...three,

        // WebGLRenderer
        WebGLRenderer: jest.fn(() => {
            return {
                clear: jest.fn(),
                render: jest.fn(),
                setClearColor: jest.fn(),
                setPixelRatio: jest.fn(),
                setScissor: jest.fn(),
                setScissorTest: jest.fn(),
                setSize: jest.fn(),
                setViewport: jest.fn(),
            };
        }),
    }
});

describe('<v-renderer>', () => {
    beforeEach(() => {
        jest.spyOn(window, 'requestAnimationFrame');

        WebGLRenderer.mockClear();
    });
      
    afterEach(() => {
        window.requestAnimationFrame.mockRestore();
        window.scrollY = 0;
    });

    it('creates a WebGLRenderer', () => {
        const { vm } = mount({
            created() {
                // since our WebGLRenderer needs a canvas element
                // to render to, it shouldn't be instantiated yet
                expect(WebGLRenderer).not.toHaveBeenCalled();
            },
            components: {
                'v-renderer': rendererComponent,
            },
            template: `<v-renderer />`,
        });

        // now that the component has mounted, our renderer
        // should be created with our <canvas> element
        expect(WebGLRenderer).toHaveBeenCalledWith({
            alpha: true,
            antialias: true,
            canvas: vm.$el,
        });
    });

    it('tracks the number of active scenes', async () => {
        const { vm } = mount({
            data() {
                return {
                    scene: false,
                }
            },
            components: {
                'v-renderer': rendererComponent,
                'v-scene': sceneComponent,
            },
            template: `
                <div>
                    <v-renderer ref="renderer" />
                    <v-scene v-if="scene" />
                </div>
            `,
        });

        const { renderer } = vm.$refs;
        
        expect(renderer.empty).toBe(true);
        expect(renderer.sceneCount).toBe(0);

        vm.scene = true;
        await vm.$nextTick();

        expect(renderer.empty).toBe(false);
        expect(vm.$refs.renderer.sceneCount).toBe(1);

        vm.scene = false;
        await vm.$nextTick();
        
        expect(renderer.empty).toBe(true);
        expect(renderer.sceneCount).toBe(0);
    });

    it('tracks scroll position', async () => {
        window.scrollY = 10;

        const { vm } = mount({
            components: {
                'v-renderer': rendererComponent,
            },
            template: `<v-renderer ref="renderer" />`,
        });

        expect(vm.$refs.renderer.scrollY).toBe(10);
        expect(window.getComputedStyle(vm.$el).getPropertyValue('transform')).toBe('translateY(10px)');

        window.scrollY = 20;
        window.dispatchEvent(new Event('scroll'));

        await vm.$nextTick();

        expect(vm.$refs.renderer.scrollY).toBe(20);
        expect(window.getComputedStyle(vm.$el).getPropertyValue('transform')).toBe('translateY(20px)');
    });

    it('tracks browser dimensions', async () => {
        const { vm } = mount({
            components: {
                'v-renderer': rendererComponent,
            },
            template: `<v-renderer />`,
        }, {
            browser: {
                dimensions: {
                    height: 600,
                    width: 800,
                },
            },
        });

        expect(Number(vm.$el.getAttribute('height'))).toBe(600);
        expect(Number(vm.$el.getAttribute('width'))).toBe(800);

        vm.$store.commit('browser/setDimensions', { height: 1000, width: 1200 });
        await vm.$nextTick();

        expect(Number(vm.$el.getAttribute('height'))).toBe(1000);
        expect(Number(vm.$el.getAttribute('width'))).toBe(1200);
    });  

    it('runs a requestAnimationFrame loop', async () => {
        const { vm } = mount({
            data() {
                return {
                    scene: false,
                };
            },
            components: {
                'v-renderer': rendererComponent,
                'v-scene': sceneComponent,
            },
            template: `
                <div>
                    <v-renderer ref="renderer" />
                    <v-scene v-if="scene" ref="scene" />
                </div>
            `,
        });

        expect(window.requestAnimationFrame).not.toHaveBeenCalled();

        vm.scene = true;
        await vm.$nextTick();

        expect(window.requestAnimationFrame).toHaveBeenCalled();

        vm.scene = false;
        await vm.$nextTick();

        const calls = window.requestAnimationFrame.mock.calls.length;
        await timeout(20);

        expect(window.requestAnimationFrame.mock.calls.length).toBe(calls);
    });

    it('sets the size of the renderer', async () => {
        const { vm } = mount({
            components: {
                'v-scene': sceneComponent,
                'v-renderer': rendererComponent,
            },
            template: `<v-renderer ref="renderer" />`,
        }, {
            browser: {
                dimensions: {
                    height: 600,
                    width: 800,
                },
            },
        });

        const { renderer } = vm.$refs.renderer.$options.three;

        expect(renderer.setSize).not.toHaveBeenCalled();

        vm.$store.commit('browser/setDimensions', { height: 1000, width: 1200 });
        vm.$refs.renderer.renderScenes();
        await vm.$nextTick();

        expect(renderer.setSize).toHaveBeenCalled();
    })

    it('hides the canvas when there are no scenes to render', async () => {
        const { vm } = mount({
            data() {
                return {
                    scene: false,
                };
            },
            components: {
                'v-renderer': rendererComponent,
                'v-scene': sceneComponent,
            },
            template: `
                <div>
                    <v-renderer ref="renderer" />
                    <v-scene v-if="scene" />
                </div>
            `,
        });
        
        expect(vm.$refs.renderer.$el.classList.contains('hidden')).toBe(true);

        vm.scene = true;
        await vm.$nextTick();
        
        expect(vm.$refs.renderer.$el.classList.contains('hidden')).toBe(false);
    });

    it('skips rendering off-screen scenes', () => {
        const { vm } = mount({
            components: {
                'v-renderer': rendererComponent,
                'v-scene': sceneComponent,
            },
            template: `
                <div>
                    <v-renderer ref="renderer" />
                    <v-scene ref="scene" />
                </div>
            `,
        });

        const { renderer, scene } = vm.$refs;

        const render = jest.spyOn(renderer.$options.three.renderer, 'render');
        
        scene.$el.getBoundingClientRect = jest.fn(() => {
            return { bottom: -1, left: 0, right: 0, top: 0 }
        });

        expect(render).not.toHaveBeenCalled();

        scene.$el.getBoundingClientRect = jest.fn(() => {
            return { bottom: 0, left: 0, right: 0, top: 0 }
        });

        renderer.renderScenes();

        expect(render).toHaveBeenCalled();
    });
});
