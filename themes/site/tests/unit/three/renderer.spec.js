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
});
