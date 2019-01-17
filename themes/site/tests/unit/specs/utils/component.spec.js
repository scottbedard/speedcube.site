import {
    cleanTimeout,
} from '@/app/utils/component';


describe('component utils', function() {
    it('cleanTimeout', function(done) {
        const a = sinon.stub();
        const b = sinon.stub();

        vm = mount({
            created() {
                cleanTimeout(this, a, 10);
                cleanTimeout(this, b, 30);
            },
        });

        setTimeout(() => vm.$destroy(), 20);

        setTimeout(() => {
            expect(a).to.have.been.called;
            expect(b).not.to.have.been.called;

            done();
        }, 40);
    });
});
