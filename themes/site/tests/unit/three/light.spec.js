/* eslint-disable */
import lightComponent from '@/components/three/light/light.vue';
import sceneComponent from '@/components/three/scene/scene.vue';

//
// factory
//
const mount = factory({
    components: {
        'v-light': lightComponent,
        'v-scene': sceneComponent,
    },
});

//
// specs
//
describe('<v-light>', () => {
    it('updates when color or intensity changes', async () => {
        const vm = mount({
            data() {
                return {
                    color: 0xff0000,
                    intensity: 0.1,
                };
            },
            template: `
                <v-light
                    ref="light"
                    :color="color"
                    :intensity="intensity"
                />
            `,
        });

        const { obj: light } = vm.$refs.light.$options.three;

        expect(light.color).toEqual({ r: 1, g: 0, b: 0 });
        expect(light.intensity).toBe(0.1);

        vm.color = 0xffff00;
        await vm.$nextTick();
        expect(light.color).toEqual({ r: 1, g: 1, b: 0 });

        vm.intensity = 0.2;
        await vm.$nextTick();
        expect(light.intensity).toBe(0.2);
    });
});
