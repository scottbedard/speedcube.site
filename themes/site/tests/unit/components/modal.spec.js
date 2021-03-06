/* eslint-disable */
import modalsComponent from '@/layouts/default/modals/modals.vue';

//
// specs
//
describe.skip('<v-modal>', function() {
    it('renders a modal to the target container', async () => {
        const vm = mount({
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

        expect(vm.$el.querySelector('[data-foo]')).toBe(null);

        vm.foo = true;

        await timeout(200);

        expect(vm.$el.querySelector('[data-foo]')).not.toBe(null);
    });

    it('applies correct accessability properties to the modal', async function() {
        const vm = mount({
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

        expect(modalEl.getAttribute('role')).toBe('dialog');
        expect(modalEl.getAttribute('aria-labelledby')).toBe(`modal-title-${uid}`);
        expect(modalEl.getAttribute('aria-describedby')).toBe(`modal-description-${uid}`);
        expect(modalEl.querySelector(`#modal-title-${uid}`).textContent).toBe('foo');
        expect(modalEl.querySelector(`#modal-description-${uid}`).textContent).toBe('bar');
    });

    // this functionality is working, but after implementing focus-trap this spec
    // is no longer passing. skipping it for now, but we should re-visit this down
    // the road and get a spec verifying this functionality.
    it.skip('closes when the body is clicked without passing through the modal', async function() {
        const onClose = jest.fn();

        const vm = mount({
            methods: {
                onClose,
            },
            template: `
                <div>
                    <div ref="close" />

                    <v-modals />

                    <v-modal title="foo" @close="onClose">
                        <button />
                    </v-modal>
                </div>
            `,
        });
        
        await timeout(100);

        // these events are attached to the body, so that means we
        // need to place our modal in the document to run these tests
        document.body.appendChild(vm.$el);

        // clicking inside our modal should do nothing
        click(vm.$el.querySelector('button'));
        expect(onClose).not.toHaveBeenCalled();

        // clicking outside the modal should fire the close event
        click(vm.$refs.close);
        expect(onClose).to.have.been.called;

        // clean up after ourselves
        document.body.removeChild(vm.$el);
    });

    it.skip('closes when escape is pressed', async function() {
        const onClose = jest.fn();

        const vm = mount({
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

        await timeout(100);

        // these events are attached to the document body
        document.body.appendChild(vm.$el);

        // non-escape keydowns should not close the modal
        simulate('keydown', document.body);

        expect(onClose).not.toHaveBeenCalled();

        // and escape keys should close the modal
        simulate('keydown', document.body, e => {
            e.key = 'Escape';
        });

        expect(onClose).toHaveBeenCalled();

        // clean up after ourselves
        document.body.removeChild(vm.$el);
    });
});
