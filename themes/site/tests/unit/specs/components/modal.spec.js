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
describe('<v-modal>', function() {
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

    it('applies correct accessability properties to the modal', async function() {
        vm = mount({
            template: `
                <div>
                    <v-modals />
                    <v-modal ref="modal" title="foo" description="bar" />
                </div>
            `,
        });

        await vm.$nextTick();

        const uid = vm.$refs.modal.uid;
        const modalEl = vm.$el.querySelector(`[data-modal="${uid}"]`);

        expect(modalEl.getAttribute('role')).to.equal('dialog');
        expect(modalEl.getAttribute('aria-labelledby')).to.equal(`modal-title-${uid}`);
        expect(modalEl.getAttribute('aria-describedby')).to.equal(`modal-description-${uid}`);
        expect(modalEl.querySelector(`#modal-title-${uid}`).textContent).to.equal('foo');
        expect(modalEl.querySelector(`#modal-description-${uid}`).textContent).to.equal('bar');
    });

    it('closes when the body is clicked without passing through the modal', async function() {
        const onClose = stub();

        vm = mount({
            methods: {
                onClose,
            },
            template: `
                <div>
                    <v-modals />
                    <v-modal title="foo" @close="onClose">
                        <button />
                    </v-modal>
                </div>
            `,
        });
        
        await vm.$nextTick();

        // these events are attached to the body, so that means we
        // need to place our modal in the document to run these tests
        document.body.appendChild(vm.$el);

        // clicking inside our modal should do nothing
        click(vm.$el.querySelector('button'));
        expect(onClose).not.to.have.been.called;

        // clicking outside the modal should fire the close event
        click(vm.$el);
        expect(onClose).to.have.been.called;

        // clean up after ourselves
        document.body.removeChild(vm.$el);
    });

    it('closes when escape is pressed', async function() {
        const onClose = stub();

        vm = mount({
            methods: {
                onClose,
            },
            template: `
                <div>
                    <v-modals />
                    <v-modal title="foo" @close="onClose">
                        <button />
                    </v-modal>
                </div>
            `,
        });

        await vm.$nextTick();

        // these events are attached to the document body
        document.body.appendChild(vm.$el);

        // non-escape keydowns should not close the modal
        simulate('keydown', document.body);

        expect(onClose).not.to.have.been.called;

        // and escape keys should close the modal
        simulate('keydown', document.body, e => {
            e.key = 'Escape';
        });

        expect(onClose).to.have.been.called;

        // clean up after ourselves
        document.body.removeChild(vm.$el);
    });
});
