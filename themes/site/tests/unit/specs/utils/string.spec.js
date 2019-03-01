import {
    formatTime,
} from '@/app/utils/string';

//
// specs
//
describe('string utils', function() {
    it('formatTime', function() {
        const tests = {
            '0': '0:00.00',
            '1000': '0:01.00',
            '10000': '0:10.00',
            '10': '0:00.01',
            '61234': '1:01.23',
        };

        Object.keys(tests).forEach(key => {
            expect(formatTime(key)).to.equal(tests[key]);
        });
    });
});
