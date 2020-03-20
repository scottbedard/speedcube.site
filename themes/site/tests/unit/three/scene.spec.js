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

    it('instantiates a scene', () => {
        const { vm } = mount({
            components: {
                'v-scene': sceneComponent,
            },
            template: `<v-scene ref="scene" />`,
        });

        expect(vm.$refs.scene.$options.three.obj.type).toBe('Scene');
    });

    it('instantiates a camera', () => {
        const { vm } = mount({
            components: {
                'v-scene': sceneComponent,
            },
            template: `
                <v-scene
                    ref="scene"
                    :camera-aspect="2"
                    :camera-far="3"
                    :camera-fov="4"
                    :camera-near="5"
                />
            `,
        });

        const { camera } = vm.$refs.scene.$options.three

        expect(camera.type).toBe('PerspectiveCamera');
        expect(camera.aspect).toBe(2);
        expect(camera.far).toBe(3);
        expect(camera.fov).toBe(4);
        expect(camera.near).toBe(5);
    });

    it('disposes the scene when destroyed', async () => {
        const { vm } = mount({
            data() {
                return {
                    scene: true,
                };
            },
            components: {
                'v-scene': sceneComponent,
            },
            template: `<v-scene v-if="scene" ref="scene" />`,
        });

        const dispose = jest.spyOn(vm.$refs.scene.$options.three.obj, 'dispose');

        vm.scene = false;
        await vm.$nextTick();

        expect(dispose).toHaveBeenCalled();
    });

    it('adds and removes itself from the renderer', async () => {
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

        expect(vm.$refs.renderer.$options.scenes).toEqual([]);

        vm.scene = true;
        await vm.$nextTick();

        const { renderer, scene } = vm.$refs;
        expect(renderer.$options.scenes).toEqual([scene]);

        vm.scene = false;
        await vm.$nextTick();

        expect(vm.$refs.renderer.$options.scenes).toEqual([]);
    });

    it('sets the initial camera position and reacts to changes', async () => {
        const { vm } = mount({
            data() {
                return {
                    cameraAngle: 0,
                    cameraDistance: 100,
                };
            },
            components: {
                'v-scene': sceneComponent,
            },
            template: `
                <v-scene
                    ref="scene"
                    :camera-angle="cameraAngle"
                    :camera-distance="cameraDistance"
                />
            `,
        });

        // our camera should exist at the correct following position
        const { camera } = vm.$refs.scene.$options.three;
        expect(camera.position).toEqual({ x: 0, y: 100, z: 0 });
        
        // change the camera angle
        // we'll rotate 180deg to make the following assertion a bit easier
        const lookAt = jest.spyOn(camera, 'lookAt');
        const set = jest.spyOn(camera.position, 'set');

        vm.cameraAngle = 180;
        await vm.$nextTick();

        // the camera should be repositioned
        // @todo: improve this assertion with non-ridiculous values
        expect(set).toHaveBeenCalledWith(0, expect.any(Number), expect.any(Number));
        expect(lookAt).toHaveBeenCalledWith(0, 0, 0);
        expect(camera.position.y).toBe(-100);

        set.mockClear();
        lookAt.mockClear();

        // change the camera distance
        // this will put us twice as far from the origin
        vm.cameraDistance = 200;
        await vm.$nextTick();

        expect(set).toHaveBeenCalledWith(0, expect.any(Number), expect.any(Number));
        expect(lookAt).toHaveBeenCalledWith(0, 0, 0);
        expect(camera.position.y).toBe(-200);
    });
});
