/* eslint-disable */
import boxComponent from '@/components/three/box/box.vue';
import sceneComponent from '@/components/three/scene/scene.vue';

//
// factory
//
const mount = factory({
    components: {
        'v-box': boxComponent,
    },
});

//
// specs
//
describe('<v-light>', () => {
    it('updates when color changes', async () => {
        const vm = mount({
            data() {
                return {
                    color: 0xff0000,
                };
            },
            template: `<v-box ref="box" :color="color" />`,
        });

        const { obj: box } = vm.$refs.box.$options.three;

        expect(box.material.color).toEqual({ r: 1, g: 0, b: 0 });

        vm.color = 0x00ff00;
        await vm.$nextTick();

        expect(box.material.color).toEqual({ r: 0, g: 1, b: 0 });
    });
});
