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
        vm = mount({
            template: `<v-default-layout />`,
        });

        const push = sinon.stub(vm.$router, 'push');

        click(vm.$el.querySelector('[data-logo]'));

        expect(push).to.have.been.calledWithMatch({ name: 'home' });
    });
});