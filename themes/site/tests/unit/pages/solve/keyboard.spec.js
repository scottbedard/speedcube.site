/* eslint-disable */
import keyboardComponent from '@/pages/solve/keyboard/keyboard.vue';
import modalsComponent from '@/layouts/default/modals/modals.vue';

//
// specs
//
describe('solve page / keyboard editor', () => {
    it.skip('creates new key bindings', async () => {
        const vm = mount({
            components: {
                'v-keyboard': keyboardComponent,
                'v-modals': modalsComponent,
            },
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
