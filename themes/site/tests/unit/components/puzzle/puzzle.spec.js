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

    it('listens for escape', async () => {
        const onEsc = jest.fn();
        const model = new Cube(3, { useObjects: true });

        const vm = mount({
            data: () => ({ turnable: false }),
            computed: { model: () => model },
            methods: { onEsc },
            template: `
                <v-puzzle
                    type="3x3"
                    :model="model"
                    :turnable="turnable"
                    @escape="onEsc"
                />
            `,
        });

        vms.push(vm);

        simulate('keyup', document.body, e => { e.key = 'Escape' });
        expect(onEsc).not.toHaveBeenCalled();

        vm.turnable = true;
        await vm.$nextTick();

        simulate('keyup', document.body, e => { e.key = 'Escape' });
        expect(onEsc).toHaveBeenCalled();
    });

    it('listens for spacebar', async () => {
        const onSpace = jest.fn();
        const model = new Cube(3, { useObjects: true });

        const vm = mount({
            data: () => ({ turnable: false }),
            computed: { model: () => model },
            methods: { onSpace },
            template: `
                <v-puzzle
                    type="3x3"
                    :model="model"
                    :turnable="turnable"
                    @space="onSpace"
                />
            `,
        });

        vms.push(vm);

        simulate('keypress', document.body, e => { e.key = ' ' });
        expect(onSpace).not.toHaveBeenCalled();

        vm.turnable = true;
        await vm.$nextTick();

        simulate('keypress', document.body, e => { e.key = ' ' });
        expect(onSpace).toHaveBeenCalled();
    });
});
