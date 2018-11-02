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

    it('accepts a size prop', function() {
        const def = mount({ template: `<v-button />` });
        const sm = mount({ template: `<v-button size="sm" />` });
        const md = mount({ template: `<v-button size="md" />` });

        expect(def.$el).to.have.class('v-button-md');
        expect(sm.$el).to.have.class('v-button-sm');
        expect(md.$el).to.have.class('v-button-md');
    });
});
