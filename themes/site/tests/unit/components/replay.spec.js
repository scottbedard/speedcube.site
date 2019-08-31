/* eslint-disable */
import Cube from 'bedard-cube';
import replayComponent from '@/components/ui/replay.vue';

//
// fixtures
//
const config3x3 = `{\"colors\":[\"#FFEC31\",\"#FF942C\",\"#2869E6\",\"#EC6157\",\"#58EA5E\",\"#F0F0F0\"],\"cameraAngle\":47,\"cameraDistance\":2321,\"innerBrightness\":100,\"stickerElevation\":14,\"stickerRadius\":0,\"stickerSpacing\":19,\"turnDuration\":80}`;
const scrambled3x3 = `{\"U\":[2,2,3,0,0,3,1,3,1],\"L\":[3,4,2,2,1,0,4,1,4],\"F\":[0,4,5,1,2,2,5,5,4],\"R\":[2,0,4,5,3,2,1,3,0],\"B\":[0,1,5,3,4,0,3,1,1],\"D\":[3,4,5,4,5,5,0,5,2]}`
const solution3x3 = `653:X 893:X' 1004:Y 1732:Y 3022:Y 3773:X 4162:X' 4388:Y' 4553:Y' 5017:Y' 5722:Y' 7463:Y' 8018:Y 10882#START 11077:R 11198:D 11332:F 11438:D' 11887:F' 12473:Y' 12907:U 13118:U 13223:Y' 13627:U' 13761:R 13874:U' 13974:R' 14076:U' 14227:Y' 14392:R 14491:U 14592:R' 14692:F' 14791:U 14917:F 15457:R 15560:U 15682:R' 15967:Y' 16282:R 16394:U 16494:R' 16866:Y 17107:R' 17212:U 17363:R 18038:U' 18216:Y 18442:R' 18546:U 18646:R 18862:U 19223:L 19329:U' 19430:L' 20151:2R 20265:U 20364:2R' 20466:U 20565:U 20665:2R 20766:U 20865:2R' 21127:U' 21239:R' 21338:F' 21439:L 21538:F 21638:R 21739:F' 21839:L' 21939:F 22462:U 22762:U' 22874:Y 23332:R' 23441:F 23540:R' 23647:B' 23782:B' 23890:R 24025:F' 24126:R' 24246:B' 24382:B' 24492:R' 24592:R' 24692#END`;

//
// factory
//
const mount = factory({
    components: {
        'v-replay': replayComponent,
    },
});

//
// specs
//
describe('<v-replay>', () => {
    it('instantiates cube models', () => {
        const vm = mount({
            computed: {
                scrambledState: () => scrambled3x3,
                solution: () => solution3x3,
            },
            template: `
                <v-replay
                    ref="replay"
                    type="3x3"
                    :scrambled-state="scrambledState"
                    :solution="solution"
                />
            `,
        });

        const { model } = vm.$refs.replay;
        
        expect(model).toBeInstanceOf(Cube);
        expect(model.size).toBe(3);
        expect(model.state.U.map(s => s.value)).toEqual([2,2,3,0,0,3,1,3,1]);
        expect(model.state.L.map(s => s.value)).toEqual([3,4,2,2,1,0,4,1,4]);
        expect(model.state.F.map(s => s.value)).toEqual([0,4,5,1,2,2,5,5,4]);
        expect(model.state.R.map(s => s.value)).toEqual([2,0,4,5,3,2,1,3,0]);
        expect(model.state.B.map(s => s.value)).toEqual([0,1,5,3,4,0,3,1,1]);
        expect(model.state.D.map(s => s.value)).toEqual([3,4,5,4,5,5,0,5,2]);
    });

    it('calculates the current turn and progress', () => {
        const vm = mount({
            computed: {
                config: () => '{"turnDuration":100}',
                solution: () => '100#START 200:R 300:U- 400:R 500#END',
            },
            template: `
                <v-replay
                    ref="replay"
                    type="3x3"
                    :config="config"
                    :progress="0.5"
                    :solution="solution"
                />
            `,
        });
        
        const { duration, timeOffset, currentTurn, turnProgress } = vm.$refs.replay;

        expect(currentTurn).toEqual({ time: 200, type: 'turn', value: 'R' });
        expect(duration).toBe(500);
        expect(timeOffset).toBe(250);
        expect(turnProgress).toBe(0.5);
    });
});
