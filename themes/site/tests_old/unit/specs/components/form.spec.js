
//
// specs
//
describe('<v-form> & <v-form-field>', function() {
    it('emits a submit event', function(done) {
        const onSubmit = stub();

        vm = mount({
            methods: {
                onSubmit,
            },
            template: `<v-form @submit="onSubmit" />`,
        });

        submit(vm.$el);

        setTimeout(() => {
            expect(onSubmit).to.have.been.called;

            done();
        }, 10);
    });

    it('doesnt emit a submit event if validation fails');
});
