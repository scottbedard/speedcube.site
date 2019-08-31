/* eslint-disable */
import rootComponent from '@/root.vue';

jest.mock('@/components/three/renderer/renderer.vue', () => {
    return {
        render: () => {},
    };
});

//
// factory
//
const mount = factory({
    components: {
        'v-root': rootComponent,
    },
});

//
// specs
//
describe('root component', function() {
    const windowDimensions = {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
    };

    beforeEach(() => {
        windowDimensions.innerWidth = window.innerWidth;
    });

    afterEach(() => {
        window.innerWidth = windowDimensions.innerWidth;
    });

    it('syncs window dimensions with vuex', function() {
        let commit;

        const vm = mount({
            beforeCreate() {
                commit = jest.spyOn(this.$store, 'commit');
            },
            template: `<v-root />`,
        });

        expect(commit).toHaveBeenCalledTimes(1);

        expect(commit).toHaveBeenCalledWith('browser/setDimensions', {
            height: expect.any(Number),
            width: expect.any(Number),
        });

        window.innerHeight = 1;
        window.innerWidth = 2;

        simulate('resize', window);

        expect(commit).toHaveBeenCalledTimes(2);

        expect(commit).toHaveBeenCalledWith('browser/setDimensions', {
            height: 1,
            width: 2,
        });
    });
});
