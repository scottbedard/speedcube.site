/* eslint-disable */
import keyboardComponent from '@/pages/solve/keyboard/keyboard.vue';
import modalsComponent from '@/layouts/default/modals/modals.vue';

//
// factory
//
const mount = factory({
    components: {
        'v-keyboard': keyboardComponent,
        'v-modals': modalsComponent,
    },
});

//
// specs
//
describe('solve page / keyboard editor', () => {
    it.skip('creates new key bindings', async () => {
        const vm = mount({
            template: `
                <div>
                    <v-keyboard />
                    <v-modals />
                </div>
            `,
        });

        click(vm.$el.querySelector('[data-add-binding]'));

        await timeout(100);
    });
});
