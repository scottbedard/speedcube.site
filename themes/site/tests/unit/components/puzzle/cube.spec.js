import cubeComponent from '@/components/puzzle/cube/cube.vue';

//
// specs
//
describe('cube puzzles', () => {
    it('disposes geometry when changed', async () => {
        const { vm } = mount({
            data() {
                return {
                    config: {
                        stickerRadius: 0,
                    },
                };
            },
            components: {
                'v-cube': cubeComponent,
            },
            template: `<v-cube ref="cube" :config="config" />`,
        });

        const dispose = jest.spyOn(vm.$refs.cube.geometry, 'dispose');

        vm.config.stickerRadius = 0.5;
        await vm.$nextTick();

        expect(dispose).toHaveBeenCalled();
    });

    it('disposes geometry when destroyed', async () => {
        const { vm } = mount({
            data() {
                return {
                    cube: true,
                };
            },
            components: {
                'v-cube': cubeComponent,
            },
            template: `<v-cube v-if="cube" ref="cube" />`,
        });

        const dispose = jest.spyOn(vm.$refs.cube.geometry, 'dispose');

        vm.cube = false;
        await vm.$nextTick();

        expect(dispose).toHaveBeenCalled();
    });
});
