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
                '/api/givingteam/auth/signin': true,
            },
        });
    });

    it('resets the store on mount', function() {
        let commit;

        vm = mount({
            beforeCreate() {
                commit = stub(this.$store, 'commit');
            },
            template: `<v-signin />`,
        });

        expect(commit).to.have.been.calledWith('signin/reset');
    });

    it('syncs the form with vuex state', function() {
        vm = mount({
            template: `<v-signin />`,
        });

        input('foo@bar.com', vm.$el.querySelector('[data-email] input'));
        input('abc123', vm.$el.querySelector('[data-password] input'));
        click(vm.$el.querySelector('[data-remember]'));

        expect(vm.$store.state.signin.form).to.deep.equal({
            email: 'foo@bar.com',
            password: 'abc123',
            remember: true,
        });
    });

    it('logs the user in when the form is submitted', function(done) {
        vm = mount({
            beforeCreate() {
                preventInitialization(this);
            },
            template: `<v-signin />`,
        }, {
            signin: {
                form: {
                    email: 'foo@bar.com',
                    password: 'abc123',
                    remember: false,
                },
            },
        });

        submit(vm.$el.querySelector('form'));

        setTimeout(() => {
            expect(axios.post).to.have.been.calledWithMatch(
                '/api/givingteam/auth/signin',
                {
                    login: 'foo@bar.com',
                    password: 'abc123',
                    remember: false,
                }
            );

            done();
        }, 10);
    });
});
