import axios from 'axios';
import userComponent from '@/pages/users/user/user.vue';

//
// fixtures
//
import { userFixture } from '../../fixtures/user';

//
// factory
//
const mount = factory({
    components: {
        'v-user': userComponent,
    },
    routes: [
        'replay',
        {
            name: 'test',
            path: 'users/:username',
        },
    ],
});

//
// specs
//
describe('user page', function() {
    beforeEach(function() {
        stubRequests({
            get: {
                '/api/speedcube/speedcube/users/scott/overview': userFixture,
                '/api/speedcube/speedcube/users/foo/overview': userFixture,
            },
        });
    });

    it('fetches data on initial load', async function() {
        const vm = mount({
            beforeCreate() {
                this.$router.replace({
                    name: 'test',
                    params: {
                        username: 'scott',
                    },
                });
            },
            template: `<v-user />`,
        });

        await timeout(20);

        expect(axios.get).toHaveBeenCalledWith('/api/speedcube/speedcube/users/scott/overview', expect.anything());

        vm.$router.replace({
            name: 'test',
            params: {
                username: 'foo',
            },
        });

        await timeout(20);

        expect(axios.get).toHaveBeenCalledWith('/api/speedcube/speedcube/users/foo/overview', expect.anything());
    });
});
