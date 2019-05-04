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

    it('signs the user out', function(done) {
        let push;

        vm = mount({
            beforeCreate() {
                push = stub(this.$router, 'push');
            },
            template: `<v-signout />`,
        });

        expect(axios.get).to.have.been.calledWith('/api/rainlab/user/signout');

        setTimeout(() => {
            expect(push).to.have.been.calledWithMatch({ name: 'home' });

            done();
        }, 10);
    });
});
