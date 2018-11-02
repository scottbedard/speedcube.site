//
// specs
//
describe('<v-card>', function() {
    it('renders default content', function() {
        vm = mount({
            template: `<v-card>Hello world</v-card>`,
        });

        expect(vm.$el.textContent).to.equal('Hello world');
    });

    it('supports a padded prop', function(done) {
        vm = mount({
            data() {
                return {
                    padded: false,
                };
            },
            template: `<v-card :padded="padded" />`,
        });

        const hasPadding = el => el.className.split(' ').filter(c => /^p-\d+$/g.test(c)).length > 0;

        expect(hasPadding(vm.$el)).to.be.false;

        vm.padded = true;
        vm.$nextTick(() => {
            expect(hasPadding(vm.$el)).to.be.true;
            done();
        });
    });
});
