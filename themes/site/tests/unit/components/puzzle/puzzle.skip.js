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

describe('<v-puzzle>', () => {
    let vms;

    afterEach(() => {
        vms.forEach(vm => vm.$destroy());
    });

    beforeEach(() => {
        vms = [];
    });
});
