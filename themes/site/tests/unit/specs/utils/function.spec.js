import { easeInOutExpo } from '@/app/constants';

import {
    ease,
} from '@/app/utils/function';

//
// specs
//
describe('function utils', function() {
    it('ease', async function() {
        let prev;

        const fn = spy((val) => {
            if (prev) {
                expect(val > prev).to.be.true;
            }

            prev = val;
        });

        ease(easeInOutExpo, fn, 50, 10);

        await timeout(100);

        const calls = fn.getCalls();

        expect(calls.length).to.equal(11);
        expect(fn).to.have.been.calledWithMatch(0);
        expect(fn).to.have.been.calledWithMatch(1);
    });

    it('ease (canceled)', async function() {
        const fn = spy();

        const timeouts = ease(easeInOutExpo, fn, 50);

        timeouts.cancel();

        await timeout(100);

        expect(fn).not.to.have.been.called;
    });
});
