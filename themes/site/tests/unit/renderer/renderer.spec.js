/* eslint-disable */
import rendererComponent from '@/components/renderer/renderer.vue';
import sceneComponent from '@/components/renderer/scene/scene.vue';

//
// factory
//
const mount = factory({
    components: {
        'v-renderer': rendererComponent,
        'v-scene': sceneComponent,
    },
});

//
// specs
//
describe('<v-renderer>', () => {
    it('registers and unregisters scenes', async () => {
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
});
