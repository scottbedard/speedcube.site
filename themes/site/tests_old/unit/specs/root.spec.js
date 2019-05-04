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
    it('syncs window dimensions with vuex', function() {
        let commit;

        vm = mount({
            beforeCreate() {
                commit = stub(this.$store, 'commit');
            },
            template: `<v-root />`,
        });

        expect(commit).to.have.been.calledWith('browser/setDimensions');

        stub(window, 'innerHeight').value(1);
        stub(window, 'innerWidth').value(2);
        simulate('resize', window);

        expect(commit).to.have.been.calledWithMatch('browser/setDimensions', {
            height: 1,
            width: 2,
        });

        expect(commit).to.have.been.calledTwice;
    });
});
