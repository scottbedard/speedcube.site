/* eslint-disable */
import cameraComponent from '@/components/renderer/camera/camera.vue';
import rendererComponent from '@/components/renderer/renderer.vue';
import sceneComponent from '@/components/renderer/scene/scene.vue';

//
// factory
//
const mount = factory({
    components: {
        'v-camera': cameraComponent,
        'v-renderer': rendererComponent,
        'v-scene': sceneComponent,
    },
});

//
// specs
//
describe('renderer', () => {
    beforeEach(() => {
        global.window.scrollY = 0;
    });

    //
    // renderer
    //
    describe('<v-renderer>', () => {
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
            expect(global.window.getComputedStyle(vm.$el).getPropertyValue('transform')).toBe('translateY(10px)');

            global.window.scrollY = 20;
            global.window.dispatchEvent(new Event('scroll'));

            await vm.$nextTick();

            expect(vm.$refs.renderer.scrollY).toBe(20);
            expect(global.window.getComputedStyle(vm.$el).getPropertyValue('transform')).toBe('translateY(20px)');
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

            expect(vm.$refs.scene.$options.three.camera).toBe(vm.$refs.camera.$options.camera);

            vm.camera = false;
            await vm.$nextTick();

            expect(vm.$refs.scene.$options.three.camera).toBe(null);
        });
    });
});
