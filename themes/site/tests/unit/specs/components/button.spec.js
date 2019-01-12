describe('<v-button>', function() {
    it('emits a click event', function() {
        const onClick = spy();

        const vm = mount({
            methods: { 
                onClick,
            },
            template: `<v-button @click="onClick" />`,
        });

        click(vm.$el);

        expect(onClick).to.have.been.called;
    });

    it('renders default slot content', function() {
        vm = mount({
            template: `<v-button>Hello world</v-button>`,
        });

        expect(vm.$el.textContent).to.equal('Hello world');
    });
});
