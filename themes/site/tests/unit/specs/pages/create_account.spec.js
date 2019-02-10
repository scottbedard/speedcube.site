import axios from 'axios';
import createAccountComponent from '@/pages/create_account/create_account.vue';

//
// factory
//
const mount = factory({
    components: {
        'v-create-account': createAccountComponent,
    },
});

//
// fixtures
//
function userFixture() {
    return {
        activatedAt: '2018-11-04 23:21:54',
        avatar: null,
        createdAt: '2018-11-04 23:21:54',
        email: 'john@example.com',
        id: '1',
        isActivated: true,
        keyboardConfigs: [],
        lastLogin: '2018-11-04 23:21:54',
        name: 'John Doe',
        updatedAt: '2018-11-04 23:21:54',
        username: 'john@example.com',
    }
}

//
// specs
//
describe('create account page', function() {
    beforeEach(function() {
        stubRequests({
            post: {
                '/api/rainlab/user/register': userFixture,
            },
        });
    });

    it('registers a user when the form is submitted', async function() {
        vm = mount({
            template: `<v-create-account />`,
        });

        input('johndoe', vm.$el.querySelector('[data-username] input'));
        input('john@example.com', vm.$el.querySelector('[data-email] input'));
        input('abc123', vm.$el.querySelector('[data-password] input'));
        input('abc123', vm.$el.querySelector('[data-password-confirmation] input'));

        await timeout(10);
            
        submit(vm.$el.querySelector('form'));
        
        await timeout(10);
        
        expect(axios.post).to.have.been.calledWithMatch(
            '/api/rainlab/user/register',
            {
                email: 'john@example.com',
                password: 'abc123',
                password_confirmation: 'abc123',
                username: 'johndoe',
            },
        );

        expect(vm.$store.state.user.user.email).to.be.equal('john@example.com');
    });
});