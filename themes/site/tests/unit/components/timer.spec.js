/* eslint-disable */
import timerComponent from '@/components/ui/timer.vue';

//
// factory
//
const mount = factory({
    components: {
        'v-timer': timerComponent,
    },
});

//
// specs
//
describe('<v-timer>', () => {
    it('keeps time until prop is provided', async () => {
        const vm = mount({
            data() {
                return {
                    time: undefined,
                };
            },
            template: `
                <v-timer v-slot="{ currentTime }" ref="timer" :time="time">
                    <time v-text="currentTime" />
                </v-timer>
            `,
        });


        const first = Number(vm.$el.querySelector('time').textContent);
        expect(first).toBe(0);

        await global.timeout(100);

        const second = Number(vm.$el.querySelector('time').textContent);
        expect(second).toBeGreaterThan(first);

        await global.timeout(100);

        const third = Number(vm.$el.querySelector('time').textContent);
        expect(third).toBeGreaterThan(second);

        const cancel = jest.spyOn(vm.$refs.timer.$options.interval, 'cancel');
        vm.time = 150;
        await vm.$nextTick();

        const final = Number(vm.$el.querySelector('time').textContent);
        expect(cancel).toHaveBeenCalled();
        expect(final).toBe(150);
    });

    it('renders the current time at defined progress', () => {
        const vm = mount({
            template: `
                <v-timer v-slot="{ currentTime }" :progress="0.5" :time="30000">
                    <time v-text="currentTime" />
                </v-timer>
            `,
        });

        expect(vm.$el.querySelector('time').textContent).toBe('15000');
    });

    it('displays the current formatted time', () => {
        const vm = mount({
            template: `<v-timer :time="61234" />`,
        });

        expect(vm.$el.textContent).toBe('1:01.23');
    });
});
