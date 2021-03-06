import axios from 'axios';
import appearanceComponent from '@/pages/solve/appearance/appearance.vue';

//
// fixtures
//
const emptyConfigsFixture = () => ({ configs: [], status: 'success' });

//
// mocks
//
jest.mock('@/app/constants', () => {
    const actual = jest.requireActual('@/app/constants');

    return {
        ...actual,
        puzzles: {
            ...actual.puzzles,
            test: {
                defaultConfig: {
                    foo: 'default',
                },
            },
        },
    };
});

jest.mock('@/pages/solve/appearance/options', () => ({
    test: [
        {
            component: {
                render: h => <div>hmmm</div>,
            },
            key: 'foo',
            label: 'Foo',
            props: {

            },
        },
    ],
}));

//
// specs
//
describe('solve page / appearance editor', () => {
    beforeEach(() => {
        stubRequests({
            post: {
                '/api/speedcube/speedcube/config': emptyConfigsFixture,
            },
        });
    });

    it('uses the default config if no config model exists', () => {
        const { vm } = mount({
            beforeCreate() {
                this.$router.replace({ name: 'solve', params: { puzzle: 'test' } });
            },
            components: {
                'v-appearance': appearanceComponent,
            },
            template: `<v-appearance ref="appearance" />`,
        }, {
            user: {
                user: user(),
            },
        });

        expect(vm.$refs.appearance.config).toEqual({ foo: 'default' });
    });

    it('loads custom configs from the user store', () => {
        const { vm } = mount({
            beforeCreate() {
                this.$router.replace({ name: 'solve', params: { puzzle: 'test' } });
            },
            components: {
                'v-appearance': appearanceComponent,
            },
            template: `<v-appearance ref="appearance" />`,
        }, {
            user: {
                user: {
                    ...user(),
                    configs: [
                        {
                            config: '{"foo":"custom"}',
                            puzzle: 'test',
                        },
                    ],
                },
            },
        });

        expect(vm.$refs.appearance.config).toEqual({ foo: 'custom' });
    });

    it('saves user config if authenticated and returns to solve page', async () => {
        const { vm } = mount({
            beforeCreate() {
                this.$router.replace({ name: 'solve', params: { puzzle: 'test' } });
            },
            components: {
                'v-appearance': appearanceComponent,
            },
            template: `<v-appearance ref="appearance" />`,
        }, {
            user: {
                user: user(),
            },
        });

        const push = jest.spyOn(vm.$router, 'push');

        submit(vm.$el.querySelector('form'));

        await timeout(100);

        expect(axios.post).toHaveBeenCalledWith('/api/speedcube/speedcube/config', {
            config: '{"foo":"default"}',
            puzzle: 'test',
        });

        await vm.$nextTick();

        expect(push).toHaveBeenCalledWith({
            name: 'solve',
            params: {
                puzzle: 'test',
            },
        });
    });
});
