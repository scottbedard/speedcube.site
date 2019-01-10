import axios from 'axios';
import signinComponent from '@/pages/signin/signin.vue';

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
describe('signin page', function() {
    beforeEach(function() {
        stubRequests({
            post: {
                '/api/rainlab/user/signin': true,
            },
        });
    });

    it('logs the user in when the form is submitted', function(done) {
        vm = mount({
            template: `<v-signin />`,
        });

        input('johndoe', vm.$el.querySelector('[data-login] input'));
        input('abc123', vm.$el.querySelector('[data-password] input'));

        setTimeout(() => {
            submit(vm.$el.querySelector('form'));

            setTimeout(() => {
                expect(axios.post).to.have.been.calledWithMatch(
                    '/api/rainlab/user/signin',
                    {
                        login: 'johndoe',
                        password: 'abc123',
                        remember: false,
                    }
                );

                done();
            }, 10);
        }, 10);
    });
});
