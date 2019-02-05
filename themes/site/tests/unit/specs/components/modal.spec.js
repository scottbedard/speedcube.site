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

    it('focuses the first available element when opened', async function() {
        const onFocus = stub();

        vm = mount({
            data() {
                return {
                    visible: false,
                };
            },
            methods: {
                onFocus,
            },
            template: `
                <div v-if="visible">
                    <v-modals />
                    <v-modal title="foo">
                        <a href="#" @focus="onFocus" />
                    </v-modal>
                </div>
            `,
        });

        // only elements in the dom can be focused
        document.body.appendChild(vm.$el);

        vm.visible = true;

        await vm.$nextTick();

        // our anchor should have been focused
        expect(onFocus).to.have.been.called;

        // clean the document body clean
        document.body.removeChild(vm.$el);
    });

    it('restores focus to the previous element when closed', async function() {
        const onFocus = stub();

        vm = mount({
            data() {
                return {
                    visible: false,
                };
            },
            methods: {
                onFocus,
            },
            template: `
                <div>
                    <a data-foo href="#" @focus="onFocus" />

                    <v-modals />

                    <v-modal v-if="visible" title="foo">
                        <a data-bar href="#" />
                    </v-modal>
                </div>
            `,
        });

        // add our component to the document and focus the outer link. once
        // this is done we can reset the focus stub and perform our test.
        document.body.appendChild(vm.$el);
        vm.$el.querySelector('[data-foo]').focus();
        onFocus.reset();

        // open and close the modal
        vm.visible = true;
        await timeout(200);
        vm.visible = false;
        await timeout(200);
        
        // our original anchor should have been focused
        expect(onFocus).to.have.been.called;

        // clean up after ourselves
        document.body.removeChild(vm.$el);
    });

    it('closes when the backdrop is clicked');

    it('closes when escape is pressed');
});
