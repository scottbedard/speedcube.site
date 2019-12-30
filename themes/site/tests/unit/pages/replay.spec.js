import Cube from 'bedard-cube';
import axios from 'axios';
import replayComponent from '@/pages/replay/replay.vue';

//
// fixtures
//
import { solveFixture } from '~/fixtures/solves';

//
// specs
//
describe('replay page', () => {
    beforeEach(() => {
        stubRequests({
            get: {
                '/api/speedcube/speedcube/solves/1': solveFixture,
                '/api/speedcube/speedcube/solves/2': false,
            },
        });
    });

    it('fetches solve and displays a loading state', async () => {
        const { vm } = mount({
            beforeCreate() {
                this.$router.replace({ name: 'replay', params: { id: 1 } });
            },
            components: {
                'v-replay': replayComponent,
            },
            template: `<v-replay ref="replay" />`,
        });

        expect(axios.get).toHaveBeenCalledWith('/api/speedcube/speedcube/solves/1');
        expect(vm.$el.querySelector('[data-solve-loading]')).not.toBe(null);
        expect(vm.$el.querySelector('[data-solve-ready]')).toBe(null);

        await timeout(200);

        expect(vm.$el.querySelector('[data-solve-loading]')).toBe(null);
        expect(vm.$el.querySelector('[data-solve-ready]')).not.toBe(null);
    });

    it('redirects to records if solve not found', async () => {
        let replace;

        const { vm } = mount({
            beforeCreate() {
                this.$router.replace({ name: 'replay', params: { id: 2 } });

                replace = jest.spyOn(this.$router, 'replace');
            },
            components: {
                'v-replay': replayComponent,
            },
            template: `<v-replay ref="replay" />`,
        });

        await vm.$nextTick();

        expect(replace).toHaveBeenCalledWith({ name: 'records' });
    });

    it.skip('creates a cube model and applies the initial state', async () => {
        const { vm } = mount({
            beforeCreate() {
                this.$router.replace({ name: 'replay', params: { id: 1 } });
            },
            components: {
                'v-replay': replayComponent,
            },
            template: `<v-replay ref="replay" />`,
        });

        await timeout(200);

        const { model } = vm.$refs.replay;

        expect(model).toBeInstanceOf(Cube);
        expect(model.size).toBe(3);
        console.log(model.state.F.map(s => s.value));
    });

    it.skip('begins playing the replay when watch button is clicked', async () => {
        const { vm } = mount({
            beforeCreate() {
                this.$router.replace({ name: 'replay', params: { id: 1 } });
            },
            components: {
                'v-replay': replayComponent,
            },
            template: `<v-replay ref="replay" />`,
        });

        await timeout(200);

        console.log(vm.$el.outerHTML);
    });
});
