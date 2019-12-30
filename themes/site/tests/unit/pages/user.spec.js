import axios from 'axios';
import userComponent from '@/pages/users/user/user.vue';

//
// fixtures
//
import { userFixture } from '../../fixtures/user';

//
// specs
//
describe('user page', () => {
    beforeEach(() => {
        stubRequests({
            get: {
                '/api/speedcube/speedcube/users/scott/overview': userFixture,
                '/api/speedcube/speedcube/users/foo/overview': userFixture,
            },
        });
    });

    it('fetches data on initial load', async () => {
        const { vm } = mount({
            beforeCreate() {
                this.$router.replace({
                    name: 'users:show',
                    params: {
                        username: 'scott',
                    },
                });
            },
            components: {
                'v-user': userComponent,
            },
            template: `<v-user />`,
        });

        await timeout(20);

        expect(axios.get).toHaveBeenCalledWith('/api/speedcube/speedcube/users/scott/overview', expect.anything());

        vm.$router.replace({
            name: 'users:show',
            params: {
                username: 'foo',
            },
        });

        await timeout(20);

        expect(axios.get).toHaveBeenCalledWith('/api/speedcube/speedcube/users/foo/overview', expect.anything());
    });
});
