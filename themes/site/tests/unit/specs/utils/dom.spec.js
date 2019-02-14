import {
    isForeignClick,
    queryElementThen,
    walkEventPath,
} from '@/app/utils/dom';

//
// specs
//
describe('dom utils', function() {
    it('isForeignClick', function(done) {
        vm = mount({
            methods: {
                onClick(e) {
                    expect(isForeignClick(e, this.$el)).to.be.false;
                    expect(isForeignClick(e, this.$refs.foo)).to.be.true;
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
    });

    it('queryElementThen', function() {
        vm = mount({
            template: `
                <div>
                    <div data-foo />
                </div>
            `,
        });

        const foo = stub();
        const bar = stub();

        queryElementThen(vm.$el, '[data-foo]', foo);
        queryElementThen(vm.$el, '[data-bar]', bar);

        expect(foo).to.have.been.called;
        expect(bar).not.to.have.been.called;
    });

    it.only('walkEventPath (ie)', function(done) {
        const cb = stub();

        vm = mount({
            methods: {
                onClick(e) {
                    const pathLength = e.path.length;

                    // we'll make our event look like ie by deleting the path
                    delete e.path;

                    walkEventPath(e, cb);

                    expect(cb.callCount).to.equal(pathLength);

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
});
