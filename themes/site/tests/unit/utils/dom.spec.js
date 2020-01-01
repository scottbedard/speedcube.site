import {
    isForeignClick,
    queryElementThen,
    walkEventPath,
} from '@/app/utils/dom';

//
// specs
//
describe('dom utils', () => {
    // need to figure out whats different
    // about our mocked click events.
    it.skip('isForeignClick', (done) => {
        const { vm } = mount({
            methods: {
                onClick(e) {
                    // expect(isForeignClick(e, this.$el)).to.be.false;
                    // expect(isForeignClick(e, this.$refs.foo)).to.be.true;

                    done();
                },
            },
            template: `
                <div>
                    <div ref="foo" />
                    <a href="#" @click.prevent="onClick" />
                </div>
            `,
        });

        click(vm.$el.querySelector('a'));

        console.log(vm.$el.outerHTML);
    });

    it.skip('walkEventPath (ie)', (done) => {
        const cb = jest.fn();

        const { vm } = mount({
            methods: {
                onClick(e) {
                    const pathLength = e.path.length;

                    // we'll make our event look like ie by deleting the path
                    delete e.path;

                    walkEventPath(e, cb);

                    expect(cb.callCount).toBe(pathLength);

                    done();
                },
            },
            template: `
                <div @click="onClick">
                    <div data-foo />
                </div>
            `,
        });

        document.body.appendChild(vm.$el);

        click(vm.$el.querySelector('[data-foo]'));

        document.body.removeChild(vm.$el);
    });

    it('queryElementThen', () => {
        const { vm } = mount({
            template: `
                <div>
                    <div data-foo />
                </div>
            `,
        });

        const foo = jest.fn();
        const bar = jest.fn();

        queryElementThen(vm.$el, '[data-foo]', foo);
        queryElementThen(vm.$el, '[data-bar]', bar);

        expect(foo).toHaveBeenCalled();
        expect(bar).not.toHaveBeenCalled();
    });
});
