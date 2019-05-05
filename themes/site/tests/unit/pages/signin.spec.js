import axios from 'axios';
import signinComponent from '@/pages/signin/signin.vue';
import { postSigninFixture } from '../../fixtures/user';
import { getConfigFixture } from '../../fixtures/config';

//
// factory
//
const mount = factory({
    components: {
        'v-signin': signinComponent,
    },
});

//
// specs
//
describe('signin page', () => {
    beforeEach(() => {
        stubRequests({
            get: {
                '/api/speedcube/speedcube/config': getConfigFixture,
            },
            post: {
                '/api/rainlab/user/signin': postSigninFixture,
            },
        });
    });

    it('logs the user in when the form is submitted', async () => {
        const vm = mount({
            template: `<v-signin />`,
        });

        input('johndoe', vm.$el.querySelector('[data-login] input'));
        input('abc123', vm.$el.querySelector('[data-password] input'));

        await timeout(10);

        submit(vm.$el.querySelector('form'));

        await timeout(10);

        expect(axios.post).toHaveBeenCalledWith(
            '/api/rainlab/user/signin',
            {
                login: 'johndoe',
                password: 'abc123',
                remember: false,
            },
        );
    });
});
