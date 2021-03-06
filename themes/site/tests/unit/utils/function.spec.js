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

    it('ease (canceled)', async () => {
        const fn = jest.fn();

        const timeouts = ease(easeInOutExpo, fn, 50);

        timeouts.cancel();

        await timeout(100);

        expect(fn).not.toHaveBeenCalled();
    });

    it('rafEase', async () => {
        const fn = jest.fn();
        const loop = rafEase(fn, 250, easeInOutExpo);

        expect(fn).toHaveBeenCalledWith(0);

        await timeout(500);

        expect(fn).toHaveBeenCalledWith(1);
    });

    it('rafEase (cancaled)', async () => {
        const fn = jest.fn();
        const loop = rafEase(fn, 500, easeInOutExpo);

        expect(fn).toHaveBeenCalledWith(0);

        await timeout(200);

        loop.cancel();
        fn.mockClear();

        await timeout(200);

        expect(fn).not.toHaveBeenCalled();
    });
});
