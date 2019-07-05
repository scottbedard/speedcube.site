/* eslint-disable */
import sceneComponent from '@/components/three/scene/scene.vue';
import rendererComponent from '@/components/three/renderer/renderer.vue';
import { Scene, WebGLRenderer } from 'three';

//
// factory
//
const mount = factory({
    components: {
        'v-scene': sceneComponent,
        'v-renderer': rendererComponent,
    },
});

//
// mocks
//
jest.mock('three', () => {
    const three = require.requireActual('three');

    return {
        ...three,
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
// specs
//
describe('<v-scene>', () => {
    beforeEach(() => {
        WebGLRenderer.mockClear();
    });

    it('registers itself with the renderer', async () => {
        const vm = mount({
            data() {
                return {
                    scene: false,
                };
            },
            template: `
                <div>
                    <v-renderer ref="renderer" />
                    <v-scene v-if="scene" ref="scene" />
                </div>
            `,
        });

        expect(vm.$refs.renderer.$options.scenes).toEqual([]);

        vm.scene = true;
        await vm.$nextTick();

        const { renderer, scene } = vm.$refs;
        expect(renderer.$options.scenes).toEqual([scene]);

        vm.scene = false;
        await vm.$nextTick();

        expect(vm.$refs.renderer.$options.scenes).toEqual([]);
    });

    it('instantiates a camera', () => {
        const vm = mount({
            template: `<v-scene ref="scene" />`,
        });

        expect(vm.$refs.scene.$options.three.obj.type).toBe('Scene');
    });
});
