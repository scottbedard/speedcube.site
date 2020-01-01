import defaultLayoutComponent from '@/layouts/default/default.vue';

//
// specs
//
describe('default layout', () => {
    it('navigates home when logo is clicked', () => {
        const { vm } = mount({
            components: {
                'v-default-layout': defaultLayoutComponent,
            },
            template: `<v-default-layout />`,
        });

        const push = jest.spyOn(vm.$router, 'push');

        click(vm.$el.querySelector('[data-logo]'));

        expect(push).toHaveBeenCalledWith({ name: 'home' }, expect.any(Function));
    });
});
