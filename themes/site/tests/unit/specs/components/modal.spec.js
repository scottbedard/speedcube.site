import modalsComponent from '@/layouts/default/modals/modals.vue';

//
// factory
//
const mount = factory({
    components: {
        'v-modals': modalsComponent,
    },
});

//
// specs
//
describe.only('<v-modal>', function() {
    it('renders a modal to the target container', async function() {
        vm = mount({
            data() {
                return {
                    foo: false,
                };
            },
            template: `
                <div>
                    <v-modals />
                    <v-modal v-if="foo" title="foo">
                        <div data-foo />
                    </v-modal>
                </div>
            `,
        });

        expect(vm.$el.querySelector('[data-foo]')).to.be.null;

        vm.foo = true;

        await timeout(200);

        expect(vm.$el.querySelector('[data-foo]')).not.to.be.null;
    });

    it('focuses the first available element when opened');

    it('restores focus to the previous element when closed');

    it('closes when the backdrop is clicked');

    it('closes when escape is pressed');
});
