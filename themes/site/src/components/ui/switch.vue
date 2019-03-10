<style lang="scss" scoped>
[data-dot] {
    transform: scale(1.075);
    transform-origin: center;
}

div[aria-checked="false"] [data-dot] {
    left: 0%;
}

div[aria-checked="true"] [data-dot] {
    left: 50%;
}
</style>

<script>
import { get, isFunction } from 'lodash-es';

export default {
    render(h, context) {
        const { checked, disabled } = context.props;
        const { off, on } = context.slots();
        const listener = get(context, 'listeners.change');

        delete context.listeners.change;

        function toggle() {
            if (!disabled && isFunction(listener)) {
                listener(!checked);
            }
        }

        return <div class="flex flex-wrap items-center w-full">
            <div
                aria-checked={checked ? 'true' : 'false'}
                class={[
                    'h-8 mr-8 outline-none relative rounded-full trans-bg w-16',
                    checked ? 'bg-primary-5' : 'bg-grey-5',
                    disabled
                        ? 'opacity-50'
                        : 'cursor-pointer group',
                ]}
                onClick={toggle}
                role="radio"
                tabindex={disabled ? '-1' : '0'}>
                <div
                    data-dot
                    class="absolute bg-grey-8 h-8 rounded-full shadow-xs trans-bg trans-left w-8 group-hover:bg-grey-9"
                />
            </div>

            {
                /* label */
                (off || on)
                && <div class="flex-1">
                    <v-fade-transition>
                        { off && !checked && <div key="off">{off}</div> }
                        { on && checked && <div key="on">{on}</div> }
                    </v-fade-transition>
                </div>
            }
        </div>;
    },
    functional: true,
    model: {
        event: 'change',
        prop: 'checked',
    },
    props: {
        disabled: {
            default: false,
            type: Boolean,
        },
        checked: {
            default: false,
            type: Boolean,
        },
    },
};
</script>
