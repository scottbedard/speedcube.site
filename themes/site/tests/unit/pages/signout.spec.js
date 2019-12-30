import axios from 'axios';
import signoutComponent from '@/pages/signout/signout.vue';

//
// specs
//
describe('signout page', () => {
    beforeEach(() => {
        stubRequests({
            get: {
                '/api/rainlab/user/auth/logout': true,
            },
        });
    });

    it('signs the user out', async () => {
        const { vm } = mount({
            components: {
                'v-signout': signoutComponent,
            },
            template: `<v-signout />`,
        });

        await timeout(10);

        expect(axios.get).toHaveBeenCalledWith('/api/rainlab/user/auth/logout');
    });
});
