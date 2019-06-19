<style lang="scss" scoped>
    .calendar {
        transform: translateX(-50%) translateY(-50%);

        .day {
            @apply p-2 relative rounded-full;
            width: 14.285714285%;

            &:hover,
            .selected {
                @apply bg-grey-7;
            }
        }
    }

    .calendar-enter,
    .calendar-leave-to {
        @apply opacity-0;
        transform: translateX(-50%) translateY(-50%) scale(0);
        transform-origin: center;
    }

    .calendar-enter-to,
    .calendar-leave {
        @apply opacity-100;
        transform: translateX(-50%) translateY(-50%) scale(1);
        transform-origin: center;
    }
</style>

<template>
    <div>
        <!-- mobile -->
        <div class="sm:hidden">
            <v-input
                type="date"
                :value="value"
                @input="select"
            />
        </div>

        <!-- desktop -->
        <div
            class="bg-grey-2 cursor-pointer items-center h-14 hidden px-4 relative rounded sm:block"
            @click.stop="toggle">
            <div class="flex h-full items-center justify-between">
                <span>{{ value | date('MMM Do, YYYY') }}</span>
                <i class="fa fa-calendar"></i>
            </div>


            <!-- calendar -->
            <transition name="calendar">
                <div
                    v-if="expanded"
                    class="absolute calendar bg-grey-8 max-w-xs pin-l-half pin-t-half p-4 rounded shadow text-grey-2 text-sm trans-opacity trans-transform w-full"
                    @click.stop>
                    <!-- header -->
                    <div class="flex items-center justify-between">
                        <a
                            class="px-4 py-2 text-grey-4 text-lg hover:text-grey-5"
                            href="#"
                            title="Previous month"
                            @click.prevent="prev">
                            <i class="fa fa-angle-left"></i>
                        </a>
                        <div class="p-2 text-sm">
                            {{ momentValue | date('MMMM YYYY') }}
                        </div>
                        <a
                            class="px-4 py-2 text-grey-4 text-lg hover:text-grey-5"
                            href="#"
                            title="Next month"
                            @click.prevent="next">
                            <i class="fa fa-angle-right"></i>
                        </a>
                    </div>

                    <!-- days -->
                    <div class="flex flex-wrap text-center">
                        <a
                            v-for="day in calendar.previousMonth"
                            class="day text-grey-6 trans-bg trans-color hover:text-grey-5"
                            href="#"
                            :class="{
                                selected: day === value,
                            }"
                            :key="day"
                            @click.prevent="select(day)">
                            {{ day | date('D') }}
                        </a>
                        <a
                            v-for="day in calendar.currentMonth"
                            class="day text-grey-3 trans-bg trans-color hover:text-grey-2"
                            href="#"
                            :class="{
                                selected: day === value,
                            }"
                            :key="day"
                            @click.prevent="select(day)">
                            {{ day | date('D') }}
                        </a>
                        <a
                            v-for="day in calendar.nextMonth"
                            class="day text-grey-6 trans-bg trans-color hover:text-grey-5"
                            href="#"
                            :class="{
                                selected: day === value,
                            }"
                            :key="day"
                            @click.prevent="select(day)">
                            {{ day | date('D') }}
                        </a>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import { bindExternalEvent } from 'spyfu-vue-utils';

export default {
    data() {
        return {
            expanded: false,
            monthOffset: 0,
        };
    },
    mounted() {
        bindExternalEvent(this, this.$root.$el, 'click', this.close);
    },
    computed: {
        calendar() {
            // calculate start of month padding
            const previousMonth = [];
            const lastDayOfLastMonth = this.momentValue.clone().startOf('month');

            for (let i = 0, end = lastDayOfLastMonth.format('d'); i < end; i += 1) {
                previousMonth.push(lastDayOfLastMonth.clone().subtract(end - i, 'day').format('YYYY-MM-DD'));
            }

            // calculate this month's day values
            const currentMonth = [];
            const firstDayOfMonth = this.momentValue.clone().startOf('month');
            const daysInMonth = firstDayOfMonth.daysInMonth();

            for (let i = 0; i < daysInMonth; i += 1) {
                currentMonth.push(firstDayOfMonth.clone().add(i, 'day').format('YYYY-MM-DD'));
            }

            // calculate end of month padding
            const nextMonth = [];
            const firstDayOfNextMonth = this.momentValue.clone().endOf('month').startOf('day').add(1, 'day');

            for (let i = 0; i < 6; i += 1) {
                const day = firstDayOfNextMonth.clone().add(i, 'day');

                if (day.format('d') === '0') {
                    break;
                }

                nextMonth.push(day.format('YYYY-MM-DD'));
            }

            return {
                currentMonth,
                nextMonth,
                previousMonth,
            };
        },
        momentValue() {
            return moment(this.value, 'YYYY-MM-DD').add(this.monthOffset, 'month');
        },
    },
    methods: {
        close() {
            this.expanded = false;
        },
        next() {
            this.monthOffset += 1;
        },
        open() {
            this.expanded = true;
            this.monthOffset = 0;
        },
        prev() {
            this.monthOffset -= 1;
        },
        select(day) {
            this.$emit('input', day);

            this.close();
        },
        toggle() {
            if (this.expanded) {
                this.close();
            } else {
                this.open();
            }
        },
    },
    props: {
        value: {
            default() {
                return moment().format('YYYY-MM-DD');
            },
            type: String,
        },
    },
};
</script>
