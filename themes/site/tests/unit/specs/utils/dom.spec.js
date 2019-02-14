import {
    isForeignClick,
    queryElementThen,
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
});
