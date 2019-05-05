import defaultLayoutComponent from '@/layouts/default/default.vue';

//
// factory
//
const mount = factory({
    components: {
        'v-default-layout': defaultLayoutComponent,
    },
});

//
// specs
//
describe('default layout', function() {
    it('navigates home when logo is clicked', function() {
        const vm = mount({
            template: `<v-default-layout />`,
        });

        const push = jest.spyOn(vm.$router, 'push');

        click(vm.$el.querySelector('[data-logo]'));

        expect(push).toHaveBeenCalledWith({ name: 'home' });
    });
});