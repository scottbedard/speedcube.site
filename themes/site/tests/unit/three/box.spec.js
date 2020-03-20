import boxComponent from '@/components/three_old/box/box.vue';
import sceneComponent from '@/components/three_old/scene/scene.vue';

//
// specs
//
describe('<v-box>', () => {
    it('disposes geometry and material when destroyed', async () => {
        const { vm } = mount({
            data() {
                return {
                    box: true,
                };
            },
            components: {
                'v-box': boxComponent,
            },
            template: `<v-box v-if="box" ref="box" />`,
        });

        const { geometry, material } = vm.$refs.box.$options.three;

        const disposeGeometry = jest.spyOn(geometry, 'dispose');
        const disposeMaterial = jest.spyOn(material, 'dispose');

        vm.box = false;
        await vm.$nextTick();

        expect(disposeGeometry).toHaveBeenCalled();
        expect(disposeMaterial).toHaveBeenCalled();
    });

    it('updates when color changes', async () => {
        const { vm } = mount({
            data() {
                return {
                    color: 0xff0000,
                };
            },
            components: {
                'v-box': boxComponent,
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
