//
// specs
//
describe('<v-form> & <v-form-field>', () => {
    it('emits a submit event', async () => {
        const onSubmit = jest.fn();

        const { vm } = mount({
            methods: {
                onSubmit,
            },
            template: `<v-form @submit="onSubmit" />`,
        });

        submit(vm.$el);

        await timeout(10);

        expect(onSubmit).toHaveBeenCalled();
    });
});
