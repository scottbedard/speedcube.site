import axios from 'axios';

//
// helpers
//
const createStore = () => mount().$store;

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
describe('user store', function() {
    beforeEach(function() {
        stubRequests({
            get: {
                '/api/speedcube/speedcube/config': configsFixture,
            },
        });
    });

    //
    // actions
    //
    describe('actions', function() {
        it('syncConfigs', function(done) {
            const store = createStore();
            const request = store.dispatch('user/syncConfigs');

            expect(axios.get).to.have.been.calledWith('/api/speedcube/speedcube/config');
            expect(store.state.user.configsAreLoading).to.be.true;

            setTimeout(() => {
                expect(store.state.user.configsAreLoading).to.be.false;
                done();
            }, 10);
        });
    });
});
