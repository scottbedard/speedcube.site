//
// specs
//
describe('<v-input>', function() {
    it('renders an input element', function() {
        const vm = mount({
            template: `<v-input placeholder="foo" />`,
        });

        const inputEl = vm.$el.querySelector('input');

        expect(inputEl).not.toBe(null);
        expect(inputEl.getAttribute('placeholder')).toBe('foo');
    });

    it('interfaces with v-model', function() {
        const vm = mount({
            data() {
                return {
                    value: 'foo',
                };
            },
            template: `<v-input v-model="value" />`,
        });

        const inputEl = vm.$el.querySelector('input');
        
        expect(inputEl.value).toBe('foo');

        input('bar', inputEl);
        
        expect(vm.value).toBe('bar');
    });

    it('accepts an id', function() {
        const vm = mount({
            template: `<v-input id="hello" />`,
        });

        expect(vm.$el.querySelector('input').getAttribute('id')).toBe('hello');
    });

    it('accepts a placeholder', function() {
        const vm = mount({
            template: `<v-input placeholder="hello" />`,
        });

        expect(vm.$el.querySelector('input').getAttribute('placeholder')).toBe('hello');
    });

    it('accepts a type', function() {
        const vm = mount({
            template: `<v-input type="password" />`,
        });

        expect(vm.$el.querySelector('input').getAttribute('type')).toBe('password');
    });
});
