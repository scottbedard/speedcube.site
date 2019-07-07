/* eslint-disable */
import boxComponent from '@/components/three/box/box.vue';
import axesHelperComponent from '@/components/three/axes_helper/axes_helper.vue';

//
// factory
//
const mount = factory({
    components: {
        'v-axes-helper': axesHelperComponent,
    },
});

//
// specs
//
describe('<v-axes-helper>', () => {
    it('instantiates axes helper line segments', () => {
        const vm = mount({
            template: `<v-axes-helper ref="axesHelper" />`,
        });

        expect(vm.$refs.axesHelper.$options.three.obj.type).toBe('LineSegments');
    });
});
