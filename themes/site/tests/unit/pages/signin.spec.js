import axios from 'axios';
import signinComponent from '@/pages/signin/signin.vue';
import { postSigninFixture } from '../../fixtures/user';
import { getConfigFixture } from '../../fixtures/config';

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
                '/api/rainlab/user/auth/login': postSigninFixture,
            },
        });
    });

    it('logs the user in when the form is submitted', async () => {
        const { vm } = mount({
            components: {
                'v-signin': signinComponent,
            },
            template: `<v-signin />`,
        });

        input('johndoe', vm.$el.querySelector('[data-login] input'));
        input('abc123', vm.$el.querySelector('[data-password] input'));

        await timeout(10);

        submit(vm.$el.querySelector('form'));

        await timeout(10);

        expect(axios.post).toHaveBeenCalledWith(
            '/api/rainlab/user/auth/login',
            {
                login: 'johndoe',
                password: 'abc123',
                remember: false,
            },
        );
    });
});
