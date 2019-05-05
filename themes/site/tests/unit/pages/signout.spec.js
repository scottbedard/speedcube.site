import axios from 'axios';
import signoutComponent from '@/pages/signout/signout.vue';

//
// factory
//
const mount = factory({
    components: {
        'v-signout': signoutComponent,
    },
});

//
// specs
//
describe('signout page', function() {
    beforeEach(function() {
        stubRequests({
            get: {
                '/api/rainlab/user/signout': true,
            },
        });
    });

    it('signs the user out', async () => {
        let push;

        const vm = mount({
            template: `<v-signout />`,
        });

        await timeout(10);

        expect(axios.get).toHaveBeenCalledWith('/api/rainlab/user/signout');
    });
});
