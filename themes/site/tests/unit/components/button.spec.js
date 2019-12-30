describe('<v-button>', () => {
    it('emits a click event', () => {
        const onClick = jest.fn();

        const { vm } = mount({
            methods: {
                onClick,
            },
            template: `<v-button @click="onClick" />`,
        });

        click(vm.$el);

        expect(onClick).toHaveBeenCalled();
    });

    it('renders default slot content', () => {
        const { vm } = mount({
            template: `<v-button>Hello world</v-button>`,
        });

        expect(vm.$el.textContent).toBe('Hello world');
    });
});
