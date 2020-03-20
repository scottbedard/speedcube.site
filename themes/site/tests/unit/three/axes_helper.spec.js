import axesHelperComponent from '@/components/three_old/axes_helper/axes_helper.vue';

//
// specs
//
describe('<v-axes-helper>', () => {
    it('instantiates axes helper line segments', () => {
        const { vm } = mount({
            components: {
                'v-axes-helper': axesHelperComponent,
            },
            template: `<v-axes-helper ref="axesHelper" />`,
        });

        expect(vm.$refs.axesHelper.$options.three.obj.type).toBe('LineSegments');
    });
});
