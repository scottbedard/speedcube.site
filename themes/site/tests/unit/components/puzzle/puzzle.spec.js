/* eslint-disable */
import Cube from 'bedard-cube';
import puzzleComponent from '@/components/puzzle/puzzle.vue';

//
// factory
//
const mount = factory({
    components: {
        'v-puzzle': puzzleComponent,
    },
});

//
// specs
//
describe('<v-puzzle>', () => {
    describe('cube', () => {
        it('creates cube model', () => {
            const vm = mount({
                template: `<v-puzzle ref="puzzle" type="2x2" />`,
            });

            const { model } = vm.$refs.puzzle;

            expect(model).toBeInstanceOf(Cube);
            expect(model.size).toBe(2);
        });

        it('creates cube model with initial state', () => {
            const vm = mount({
                computed: {
                    initialState: () => `{"U":[0,1,3,1,0,1,3,5,1],"L":[4,4,2,0,1,4,4,0,1],"F":[5,1,5,3,2,3,5,5,4],"R":[2,0,0,2,3,5,0,3,2],"B":[2,2,3,2,4,2,1,5,3],"D":[4,3,1,4,5,0,5,4,0]}`,
                },
                template: `
                    <v-puzzle
                        ref="puzzle"
                        type="3x3"
                        :initial-state="initialState"
                    />
                `,
            });

            const { model } = vm.$refs.puzzle;

            expect(model).toBeInstanceOf(Cube);
            expect(model.size).toBe(3);
            expect(model.state.U.map(s => s.value)).toEqual([0,1,3,1,0,1,3,5,1]);
            expect(model.state.L.map(s => s.value)).toEqual([4,4,2,0,1,4,4,0,1]);
            expect(model.state.F.map(s => s.value)).toEqual([5,1,5,3,2,3,5,5,4]);
            expect(model.state.R.map(s => s.value)).toEqual([2,0,0,2,3,5,0,3,2]);
            expect(model.state.B.map(s => s.value)).toEqual([2,2,3,2,4,2,1,5,3]);
            expect(model.state.D.map(s => s.value)).toEqual([4,3,1,4,5,0,5,4,0]);
        });
    });
});
