/* eslint-disable */
import cameraComponent from '@/components/three/camera/camera.vue';
import lightComponent from '@/components/three/light/light.vue';
import rendererComponent from '@/components/three/renderer/renderer.vue';
import sceneComponent from '@/components/three/scene/scene.vue';
import shapeComponent from '@/components/three/shape/shape.vue';
import { roundedRectangle } from '@/components/three/geometries';

import {
    AmbientLight,
    Object3D,
    PerspectiveCamera,
    PointLight,
    Scene,
    Shape,
    ShapeBufferGeometry,
    WebGLRenderer,
} from 'three';

//
// mocks
//
jest.mock('three', () => {
    return {
        // AmbientLight
        AmbientLight: jest.fn(() => {
            return {
                color: {
                    b: 0,
                    g: 0,
                    r: 0,
                    setHex: jest.fn(),
                },
                intensity: 0,
                position: {
                    set: jest.fn(),
                    x: 0,
                    y: 0,
                    z: 0,
                },
            };
        }),

        // Object3D
        Object3D: jest.fn(),

        // PerspectiveCamera
        PerspectiveCamera: jest.fn(() => {
            return {
                lookAt: jest.fn(),
                position: {
                    set: jest.fn(),
                    x: 0,
                    y: 0,
                    z: 0,
                },
            };
        }),

        // AmbientLight
        PointLight: jest.fn(() => {
            return {
                color: {
                    b: 0,
                    g: 0,
                    r: 0,
                    setHex: jest.fn(),
                },
                intensity: 0,
                position: {
                    set: jest.fn(),
                    x: 0,
                    y: 0,
                    z: 0,
                },
            };
        }),

        // Scene
        Scene: jest.fn(() => {
            return {
                add: jest.fn(),
                remove: jest.fn(),
            };
        }),

        // Shape
        Shape: jest.fn(() => {
            return {
                lineTo: jest.fn(),
                moveTo: jest.fn(),
                quadraticCurveTo: jest.fn(),
            };
        }),

        // ShapeBufferGeometry
        ShapeBufferGeometry: jest.fn(),

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
    };
});

//
// factory
//
const mount = factory({
    components: {
        'v-camera': cameraComponent,
        'v-light': lightComponent,
        'v-renderer': rendererComponent,
        'v-scene': sceneComponent,
        'v-shape': shapeComponent,
    },
});

//
// specs
//
describe('renderer', () => {
    beforeEach(() => {
        // reset window scroll position
        global.window.scrollY = 0;

        // reset threejs mocks
        AmbientLight.mockClear();
        Object3D.mockClear();
        PerspectiveCamera.mockClear();
        PointLight.mockClear();
        Scene.mockClear();
        Shape.mockClear();
        ShapeBufferGeometry.mockClear();
        WebGLRenderer.mockClear();
        
        jest.spyOn(window, 'requestAnimationFrame');
    });
      
    afterEach(() => {
        window.requestAnimationFrame.mockRestore();
    });

    //
    // camera
    //
    describe('<v-camera>', () => {
        it('registers and unregisters itself with the parent scene', async () => {
            const vm = mount({
                data() {
                    return {
                        camera: false,
                    };
                },
                template: `
                    <v-scene ref="scene">
                        <v-camera v-if="camera" ref="camera" />
                    </v-scene>
                `,
            });

            expect(vm.$refs.scene.$options.three.camera).toBe(null);

            vm.camera = true;
            await vm.$nextTick();

            expect(vm.$refs.scene.$options.three.camera).toBe(vm.$refs.camera.$options.three.camera);

            vm.camera = false;
            await vm.$nextTick();

            expect(vm.$refs.scene.$options.three.camera).toBe(null);
        });

        it('positions the camera when the angle or distance changes', async () => {
            const vm = mount({
                data() {
                    return {
                        angle: 10,
                        distance: 10,
                    };
                },
                template: `
                    <v-scene>
                        <v-camera ref="camera" :angle="angle" :distance="distance" />
                    </v-scene>
                `,
            });

            const { camera } = vm.$refs.camera.$options.three;

            // our initial position should be set
            expect(camera.position.set).toHaveBeenCalledWith(0, 9.84807753012208, 1.7364817766693033);
            expect(camera.lookAt).toHaveBeenCalledWith(0, 0, 0);

            // clear mocks and adjust angle
            camera.lookAt.mockClear();
            camera.position.set.mockClear();

            vm.angle = 20;
            await vm.$nextTick();

            // the camera should be repositioned
            expect(camera.lookAt).toHaveBeenCalledWith(0, 0, 0);
            expect(camera.position.set).toHaveBeenCalledWith(0, 9.396926207859085, 3.420201433256687);

            // clear mocks and adjust distance
            camera.lookAt.mockClear();
            camera.position.set.mockClear();

            vm.distance = 20;
            await vm.$nextTick();

            expect(camera.lookAt).toHaveBeenCalledWith(0, 0, 0);
            expect(camera.position.set).toHaveBeenCalledWith(0, 18.79385241571817, 6.840402866513374);
        });
    });

    //
    // light
    //
    describe('<v-light>', () => {
        it('adds and removes itself from the parent scene', async () => {
            const vm = mount({
                data() {
                    return {
                        light: false,
                    };
                },
                template: `
                    <v-scene ref="scene">
                        <v-light v-if="light" ref="light" />
                    </v-scene>
                `,
            });

            const { scene } = vm.$refs.scene.$options.three;
            expect(scene.add).not.toHaveBeenCalled();

            vm.light = true;
            await vm.$nextTick();

            const { light } = vm.$refs.light.$options.three;
            expect(scene.add).toHaveBeenCalledWith(light);

            vm.light = false;
            await vm.$nextTick();

            expect(scene.remove).toHaveBeenCalledWith(light);
        });

        it('updates when color or intensity changes', async () => {
            const vm = mount({
                data() {
                    return {
                        color: 0xffffff,
                        intensity: 0.1,
                    };
                },
                template: `
                    <v-scene ref="scene">
                        <v-light
                            ref="light"
                            :color="color"
                            :intensity="intensity"
                        />
                    </v-scene>
                `,
            });

            vm.intensity = 0.2;
            await vm.$nextTick();

            const { light } = vm.$refs.light.$options.three;
            expect(light.intensity).toBe(0.2);

            vm.color = 0xff0000;
            await vm.$nextTick();

            expect(light.color.setHex).toHaveBeenCalledWith(0xff0000);
        });

        it('updates when position is changed', async () => {
            const vm = mount({
                data() {
                    return { x: 1, y: 2, z: 3 };
                },
                template: `
                    <v-scene ref="scene">
                        <v-light ref="light" :position="{ x, y, z }" />
                    </v-scene>
                `,
            });

            const { light } = vm.$refs.light.$options.three;
            
            expect(light.position.set).toHaveBeenCalledWith(1, 2, 3);

            vm.x = 10;
            vm.y = 20;
            vm.z = 30;
            await vm.$nextTick();
            
            expect(light.position.set).toHaveBeenCalledWith(10, 20, 30);
        });

        it('supports ambient lights', () => {
            const vm = mount({
                template: `
                    <v-scene ref="scene">
                        <v-light type="ambient" :color="0xff0000" :intensity="0.1" />
                    </v-scene>
                `,
            });

            expect(AmbientLight).toHaveBeenCalledWith(0xff0000, 0.1);
        });

        it('supports point lights', () => {
            const vm = mount({
                template: `
                    <v-scene ref="scene">
                        <v-light type="point" :color="0xff0000" :intensity="0.1" />
                    </v-scene>
                `,
            });

            expect(PointLight).toHaveBeenCalledWith(0xff0000, 0.1);
        });
    });

    //
    // renderer
    //
    describe('<v-renderer>', () => {
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

        it('manages scenes', async () => {
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

            expect(vm.$refs.renderer.scenes.length).toBe(0);
            expect(vm.$refs.renderer.empty).toBe(true);

            vm.scene = true;
            await vm.$nextTick();

            expect(vm.$refs.renderer.empty).toBe(false);
            expect(vm.$refs.renderer.scenes.length).toBe(1);
            expect(vm.$refs.renderer.scenes[0]).toBe(vm.$refs.scene);

            vm.scene = false;
            await vm.$nextTick();

            expect(vm.$refs.renderer.scenes.length).toBe(0);
            expect(vm.$refs.renderer.empty).toBe(true);
        });

        it('tracks scroll position', async () => {
            global.window.scrollY = 10;

            const vm = mount({
                template: `<v-renderer ref="renderer" />`,
            });

            expect(vm.$refs.renderer.scrollY).toBe(10);
            expect(window.getComputedStyle(vm.$el).getPropertyValue('transform')).toBe('translateY(10px)');

            global.window.scrollY = 20;
            global.window.dispatchEvent(new Event('scroll'));

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

    //
    // sticker
    // these are essentially just double-sided mesh geometries
    //
    describe('<v-shape>', () => {
        it('adds and removes itself from the parent scene', async () => {
            const vm = mount({
                data() {
                    return {
                        shape: false,
                    };
                },
                computed: {
                    roundedRectangle: () => roundedRectangle(10, 10, 2),
                },
                template: `
                    <v-scene ref="scene">
                        <v-shape v-if="shape" ref="shape" :geometry="roundedRectangle" />
                    </v-scene>
                `,
            });

            const { scene } = vm.$refs.scene.$options.three;
            expect(scene.add).not.toHaveBeenCalled();

            vm.shape = true;
            await vm.$nextTick();

            const { obj } = vm.$refs.shape.$options.three;
            expect(scene.add).toHaveBeenCalledWith(obj);

            vm.shape = false;
            await vm.$nextTick();

            expect(scene.remove).toHaveBeenCalledWith(obj);
        });
    });
});
