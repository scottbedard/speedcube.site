/* eslint-disable */
import solveComponent from '@/pages/solve/solve.vue';

//
// fixtures
//
function configModel(opts = {}) {
    return {
        id: 1,
        userId: 1,
        puzzle: '3x3',
        config: JSON.stringify({
            cameraAngle: 50,
            cameraDistance: 200,
            colors: ['#FFEE5D', '#EFAA18', '#2589E2', '#EC6157', '#5CBD60', '#F0F0F0'],
            innerBrightness: 0.9,
            stickerElevation: 0.2,
            stickerRadius: 0.1,
            stickerSpacing: 0.2,
            turnDuration: 80
        }),
        createdAt: '2019-03-14 04:02:58',
        updatedAt: '2019-04-30 17:09:45',
        ...opts,
    };
}

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
    it('displays appearance editor', async () => {
        const vm = mount({
            template: `<v-solve />`,
        });

        expect(vm.$el.querySelector('[data-appearance]')).toBe(null);

        vm.$router.replace({ name: 'solve', query: { edit: 'appearance' }});

        await timeout(400);

        expect(vm.$el.querySelector('[data-appearance]')).not.toBe(null);
    });

    it('displays key bindings editor', async () => {
        const vm = mount({
            template: `<v-solve />`,
        });

        expect(vm.$el.querySelector('[data-keyboard]')).toBe(null);

        vm.$router.replace({ name: 'solve', query: { edit: 'keyboard' }});

        await timeout(400);

        expect(vm.$el.querySelector('[data-keyboard]')).not.toBe(null);
    });

    it('applies user config to puzzle', () => {
        const model = configModel({ puzzle: '3x3' });

        const vm = mount({
            beforeCreate() {
                this.$router.replace({ name: 'solve', params: { puzzle: '3x3' }});
            },
            template: `<v-solve ref="solve" />`,
        }, {
            user: {
                user: {
                    ...user(),
                    configs: [model],
                },
            },
        });
        
        expect(vm.$refs.solve.userConfig).toEqual({
            cameraAngle: 50,
            cameraDistance: 200,
            colors: ['#FFEE5D', '#EFAA18', '#2589E2', '#EC6157', '#5CBD60', '#F0F0F0'],
            innerBrightness: 0.9,
            stickerElevation: 0.2,
            stickerRadius: 0.1,
            stickerSpacing: 0.2,
            turnDuration: 80
        });
    });
});
