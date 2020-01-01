import axios from 'axios';
import { noop } from 'lodash-es';

//
// helpers
//
const createStore = () => mount({ render: noop }).vm.$store;

//
// fixtures
//
function configsFixture() {
    return {
        configs: [],
        status: 'success',
    };
}

//
// specs
//
describe('user store', () => {
    beforeEach(() => {
        stubRequests({
            get: {
                '/api/speedcube/speedcube/config': configsFixture,
            },
        });
    });

    //
    // actions
    //
    describe('actions', () => {
        it('syncConfigs', async () => {
            const store = createStore();
            const request = store.dispatch('user/syncConfigs');

            expect(axios.get).toHaveBeenCalledWith('/api/speedcube/speedcube/config');
            expect(store.state.user.configsAreLoading).toBe(true);

            await timeout(10);

            expect(store.state.user.configsAreLoading).toBe(false);
        });
    });
});
