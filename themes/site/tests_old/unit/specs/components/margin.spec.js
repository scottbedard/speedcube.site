//
// specs
//
describe('<v-margin>', function() {
    it('renders default slot content', function() {
        vm = mount({
            template: `<v-margin>Hello world</v-margin>`,
        });

        expect(vm.$el.textContent).to.equal('Hello world');
    });

    it('adds horizontal padding when padded prop is true', function(done) {
        vm = mount({
            data() {
                return {
                    padded: false,
                };
            },
            template: `<v-margin :padded="padded" />`,
        });

        const hasPxClass = el => el.className.split(' ').filter(c => /^px-\d+$/g.test(c)).length > 0;

        // we should not have a px-# class
        expect(hasPxClass(vm.$el)).to.be.false;

        // and flipping padded to true should attach the class
        vm.padded = true;
        vm.$nextTick(() => {
            expect(hasPxClass(vm.$el)).to.be.true;
            done();
        });
    });
});