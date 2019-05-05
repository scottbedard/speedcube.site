import {
    calculateAverage,
} from '@/app/utils/puzzle';

//
// specs
//
describe('puzzle utils', function() {
    it('calculateAverage', function() {
        const specs = [
            { times: [1, 2, 3, 4], result: -1 }, // not enough data
            { times: [1, 2, 3, 'dnf', 'dnf'], result: -1 }, // multiple dnf
            { times: [1, 2, 3, 4, 'dnf'], result: 3 }, // one dnf
            { times: [1, 2, 3, 4, 5], result: 3 }, // five regular times
            { times: [1, 1, 2, 3, 4], result: 2 }, // multiple fastest times
            { times: [1, 2, 3, 4, 4], result: 3 }, // multiple slowest times
        ];

        specs.forEach(({ times, result }) => {
            expect(calculateAverage(times)).toBe(result, `times: ${JSON.stringify(times)}`);
        });
    });
});
