/* eslint-disable */
import axios from 'axios';
import replayComponent from '@/pages/replay/replay.vue';

//
// fixtures
//
import { solveFixture } from '~/fixtures/solves';

//
// factory
//
const mount = factory({
    components: {
        'v-replay': replayComponent,
    },
});

//
// specs
//
describe('replay page', () => {
    beforeEach(() => {
        stubRequests({
            get: {
                '/api/speedcube/speedcube/solves/1': solveFixture,
                '/api/speedcube/speedcube/solves/2': false,
            },
        });
    });

    it('fetches solve and displays a loading state', async () => {
        const vm = mount({
            beforeCreate() {
                this.$router.replace({ name: 'replay', params: { id: 1 }});
            },
            template: `<v-replay ref="replay" />`,
        });

        expect(axios.get).toHaveBeenCalledWith('/api/speedcube/speedcube/solves/1');
        expect(vm.$el.querySelector('[data-solve-loading]')).not.toBe(null);
        expect(vm.$el.querySelector('[data-solve-ready]')).toBe(null);
        
        await timeout(50);

        expect(vm.$el.querySelector('[data-solve-loading]')).toBe(null);
        expect(vm.$el.querySelector('[data-solve-ready]')).not.toBe(null);
    });

    it('redirects to records if solve not found', async () => {
        let replace;

        const vm = mount({
            beforeCreate() {
                this.$router.replace({ name: 'replay', params: { id: 2 }});

                replace = jest.spyOn(this.$router, 'replace');
            },
            template: `<v-replay ref="replay" />`,
        });

        await vm.$nextTick();

        expect(replace).toHaveBeenCalledWith({ name: 'records' });
    });
});