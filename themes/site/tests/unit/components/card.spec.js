//
// specs
//
describe('<v-card>', function() {
    it('renders default content', function() {
        const vm = mount({
            template: `<v-card>Hello world</v-card>`,
        });

        expect(vm.$el.textContent).toBe('Hello world');
    });

    it('supports a padded prop', function(done) {
        const vm = mount({
            data() {
                return {
                    padded: false,
                };
            },
            template: `<v-card :padded="padded" />`,
        });

        const hasPadding = el => el.className.split(' ').filter(c => /^p[xy]?-\d+$/g.test(c)).length > 0 ||

        expect(hasPadding(vm.$el)).toBe(false);

        vm.padded = true;

        vm.$nextTick(() => {
            expect(hasPadding(vm.$el)).toBe(true);

            done();
        });
    });
});
