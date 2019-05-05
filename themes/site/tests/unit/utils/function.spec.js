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

        const fn = jest.fn((val) => {
            if (prev) {
                expect(val > prev).toBeTruthy();
            }

            prev = val;
        });

        ease(easeInOutExpo, fn, 50, 10);

        await timeout(100);
        
        expect(fn).toHaveBeenCalledTimes(11);
    });

    it.skip('ease (canceled)', async function() {
        const fn = spy();

        const timeouts = ease(easeInOutExpo, fn, 50);

        timeouts.cancel();

        await timeout(100);

        expect(fn).not.to.have.been.called;
    });
});
