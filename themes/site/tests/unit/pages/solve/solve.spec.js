/* eslint-disable */
import solveComponent from '@/pages/solve/solve.vue';

//
// factory
//
const mount = factory({
    components: {
        'v-solve': solveComponent,
    },
});

//
// specs
//
describe('solve page', () => {
    it('displays appearance editor when query string is present', async () => {
        const vm = mount({
            template: `<v-solve />`,
        });

        expect(vm.$el.querySelector('[data-appearance]')).toBe(null);

        vm.$router.replace({ query: { content: 'appearance' }});

        await timeout(200);

        expect(vm.$el.querySelector('[data-appearance]')).not.toBe(null);
    });
});
