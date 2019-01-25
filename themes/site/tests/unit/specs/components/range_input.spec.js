/* eslint-disable */

//
// specs
//
describe('<v-range-input>', function() {
    it('interfaces with v-model', function(done) {
        vm = mount({
            data() {
                return {
                    foo: 1,
                };
            },
            template: `<v-range-input v-model="foo" :min="0" :max="10" />`,
        });

        // initial value should be 1
        expect(vm.$el.value).to.equal('1');

        // input events should update state
        input(2, vm.$el);
        vm.$nextTick(() => {
            expect(vm.foo).to.equal(2);

            // and changing the state should update the input
            vm.foo = 3;
            vm.$nextTick(() => {
                expect(vm.$el.value).to.equal('3');

                done();
            });
        });
    });
});
