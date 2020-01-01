//
// specs
//
describe('<v-margin>', () => {
    it('renders default slot content', () => {
        const { vm } = mount({
            template: `<v-margin>Hello world</v-margin>`,
        });

        expect(vm.$el.textContent).toBe('Hello world');
    });

    it('adds horizontal padding when padded prop is true', async () => {
        const { vm } = mount({
            data() {
                return {
                    padded: false,
                };
            },
            template: `<v-margin :padded="padded" />`,
        });

        const hasPxClass = el => el.className.split(' ').filter(c => /^px-\d+$/g.test(c)).length > 0;

        // we should not have a px-# class
        expect(hasPxClass(vm.$el)).toBe(false);

        // and flipping padded to true should attach the class
        vm.padded = true;

        await vm.$nextTick();

        expect(hasPxClass(vm.$el)).toBe(true);
    });
});
