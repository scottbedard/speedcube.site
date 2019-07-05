/* eslint-disable */
import sceneComponent from '@/components/three/scene/scene.vue';
import rendererComponent from '@/components/three/renderer/renderer.vue';
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
                setViewport: jest.fn(),
            };
        }),
    }
});

//
// factory
//
const mount = factory({
    components: {
        'v-scene': sceneComponent,
        'v-renderer': rendererComponent,
    },
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
        const vm = mount({
            created() {
                // since our WebGLRenderer needs a canvas element
                // to render to, it shouldn't be instantiated yet
                expect(WebGLRenderer).not.toHaveBeenCalled();
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
        const vm = mount({
            data() {
                return {
                    scene: false,
                }
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

        const vm = mount({
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
        const vm = mount({
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
        const vm = mount({
            data() {
                return {
                    scene: false,
                };
            },
            template: `
                <div>
                    <v-renderer />
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

    it('hides the canvas when there are no scenes to render', async () => {
        const vm = mount({
            data() {
                return {
                    scene: false,
                };
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
});
