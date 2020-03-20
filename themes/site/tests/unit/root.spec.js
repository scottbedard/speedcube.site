import rootComponent from '@/root.vue';

jest.mock('@/components/three_old/renderer/renderer.vue', () => {
    return {
        render: () => {},
    };
});

//
// specs
//
describe('root component', () => {
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

    it('syncs window dimensions with vuex', () => {
        let commit;

        const { vm } = mount({
            beforeCreate() {
                commit = jest.spyOn(this.$store, 'commit');
            },
            components: {
                'v-root': rootComponent,
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
