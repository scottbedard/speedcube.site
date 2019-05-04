import rootComponent from '@/root.vue';

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
    it.skip('syncs window dimensions with vuex', function() {
        let commit;

        const vm = mount({
            beforeCreate() {
                commit = jest.spyOn(this.$store, 'commit');
            },
            template: `<v-root />`,
        });

        expect(commit).toHaveBeenCalledWith('browser/setDimensions');

        // stub(window, 'innerHeight').value(1);
        // stub(window, 'innerWidth').value(2);
        // simulate('resize', window);

        // expect(commit).toHaveBeenCalledWith('browser/setDimensions', {
        //     height: 1,
        //     width: 2,
        // });

        // expect(commit).to.have.been.calledTwice;
    });
});
