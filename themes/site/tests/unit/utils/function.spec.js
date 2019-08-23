/* eslint-disable */
import { easeInOutExpo } from '@/app/constants';

import {
    ease,
    rafEase,
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

    it.skip('ease (canceled)', async () => {
        const fn = spy();

        const timeouts = ease(easeInOutExpo, fn, 50);

        timeouts.cancel();

        await timeout(100);

        expect(fn).not.to.have.been.called;
    });

    it('rafEase', async () => {
        const fn = jest.fn();
        const loop = rafEase(easeInOutExpo, fn, 100);

        expect(fn).toHaveBeenCalledWith(0);

        await timeout(200);

        expect(fn).toHaveBeenCalledWith(1);
    });

    it('rafEase (cancaled)', async () => {
        const fn = jest.fn();
        const loop = rafEase(easeInOutExpo, fn, 500);

        expect(fn).toHaveBeenCalledWith(0);

        await timeout(200);

        loop.cancel();
        fn.mockClear();

        await timeout(200);

        expect(fn).not.toHaveBeenCalled();
    });
});
