import axios from 'axios';
import createAccountComponent from '@/pages/create_account/create_account.vue';

//
// fixtures
//
function freshFixture() {
    // get: /api/speedcube/speedcube/user
    return {
        status: 'success',
        user: {
            id: 9,
            name: null,
            email: "john@example.com",
            permissions: null,
            is_activated: true,
            activated_at: "2019-03-31 07:42:11",
            last_login: "2019-03-31 07:42:11",
            created_at: "2019-03-31 07:42:11",
            updated_at: "2019-03-31 07:42:11",
            username: "test6",
            surname: null,
            deleted_at: null,
            last_seen: "2019-03-31 07:50:41",
            is_guest: 0,
            is_superuser: 0,
            avatar: null,
            configs: [],
            keyboardConfigs: [],
            profile: {
                id: 9,
                user_id: 9,
                twitter_broadcasting: false,
                twitter_handle: "",
                created_at: "2019-03-31 07:42:11",
                updated_at: "2019-03-31 07:42:11",
            },
        },
    };
}

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
    };
}

//
// specs
//
describe('create account page', () => {
    beforeEach(() => {
        stubRequests({
            get: {
                '/api/speedcube/speedcube/user': freshFixture,
            },
            post: {
                '/api/rainlab/user/users': userFixture,
            },
        });
    });

    it('registers a user when the form is submitted', async () => {
        const { vm } = mount({
            components: {
                'v-create-account': createAccountComponent,
            },
            template: `<v-create-account />`,
        });

        input('johndoe', vm.$el.querySelector('[data-username] input'));
        input('john@example.com', vm.$el.querySelector('[data-email] input'));
        input('abc123', vm.$el.querySelector('[data-password] input'));
        input('abc123', vm.$el.querySelector('[data-password-confirmation] input'));

        await timeout(10);

        submit(vm.$el.querySelector('form'));

        await timeout(10);

        expect(axios.post).toHaveBeenCalledWith(
            '/api/rainlab/user/users',
            {
                email: 'john@example.com',
                password: 'abc123',
                password_confirmation: 'abc123',
                username: 'johndoe',
            },
        );

        expect(vm.$store.state.user.user.email).toBe('john@example.com');
    });
});
