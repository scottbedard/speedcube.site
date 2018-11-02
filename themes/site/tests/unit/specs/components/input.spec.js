//
// specs
//
describe('<v-input>', function() {
    it('renders an input element', function() {
        vm = mount({
            template: `<v-input placeholder="foo" />`,
        });

        const inputEl = vm.$el.querySelector('input');

        expect(inputEl).not.to.be.null;
        expect(inputEl.getAttribute('placeholder')).to.equal('foo');
    });

    it('interfaces with v-model', function() {
        vm = mount({
            data() {
                return {
                    value: 'foo',
                };
            },
            template: `<v-input v-model="value" />`,
        });

        const inputEl = vm.$el.querySelector('input');
        
        expect(inputEl.value).to.equal('foo');

        input('bar', inputEl);
        
        expect(vm.value).to.equal('bar');
    });

    it('accepts a placeholder', function() {
        vm = mount({
            template: `<v-input placeholder="hello" />`,
        });

        expect(vm.$el.querySelector('input').getAttribute('placeholder')).to.equal('hello');
    });

    it('accepts a type', function() {
        vm = mount({
            template: `<v-input type="password" />`,
        });

        expect(vm.$el.querySelector('input').getAttribute('type')).to.equal('password');
    });
});
