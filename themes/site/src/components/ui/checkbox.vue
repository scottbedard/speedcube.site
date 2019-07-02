<style lang="scss" scoped>
    .v-checkbox:hover [aria-checked=false][tabindex] {
        border-color: theme('colors.primary-2');
        opacity: 0.8;
    }

    path {
        stroke: theme('colors.primary-5');
    }
</style>

<style lang="scss">
    @keyframes checkbox {
        from { stroke-dashoffset: 50 }
        to { stroke-dashoffset: 0 }
    }
</style>

<script>
import { bindAll } from 'spyfu-vue-functional';
import { isKey, walkEventPath } from '@/app/utils/dom';

// toggle the state of a checkbox
// this will do nothing if the checkbox is disabled
function toggle(context) {
    if (!context.props.disabled && context.listeners.change) {
        context.listeners.change(!context.props.checked);
    }
}

export default {
    render(h, context) {
        const bindings = bindAll(context);
        const displayBindings = { class: [], on: {} };
        const { checked, disabled } = context.props;

        // checked
        if (checked) {
            displayBindings.class.push('border-primary bg-primary');
        } else {
            displayBindings.class.push('border-grey-dark');
        }

        // disabled
        if (disabled) {
            bindings.class.push('opacity-60');
        } else {
            bindings.class.push('cursor-pointer');
        }

        //
        // click
        //
        bindings.on.click = () => toggle(context);

        //
        // keydown
        //
        displayBindings.on.keydown = function (e) {
            if (isKey(e, 'enter')) {
                // submit on enter
                walkEventPath(e, (el) => {
                    if (el.tagName === 'FORM') {
                        // we're firing a non-standard checkbox submit event in
                        // order to side-step a firefox bug, see here for more info
                        // https://bugzilla.mozilla.org/show_bug.cgi?id=1477286
                        el.dispatchEvent(new Event('checkbox-submit'));
                    }
                });
            } else if (isKey(e, 'spacebar')) {
                // toggle the checkbox on spacebar
                toggle(context);

                e.preventDefault();
            }
        };

        // delete the change binding, we're handing
        // this ourselves in the toggle function
        delete bindings.on.change;

        return <div
            class="v-checkbox flex items-center text-grey-8 trans-color focus-within:text-grey-9"
            {...bindings}>
            <div
                aria-checked={checked ? 'true' : 'false'}
                class="bg-grey-2 h-6 rounded p-1 w-6 focus:outline-none"
                role="checkbox"
                tabindex={disabled ? null : 0}
                {...displayBindings}>
                <svg
                    class="w-full"
                    focusable="false"
                    version="1.1"
                    viewBox="0 0 24 24">
                    <path
                        d="M4.1,12.7 9,17.6 20.3,6.3"
                        fill="none"
                        stroke-dasharray="50"
                        stroke-dashoffset="50"
                        stroke-width="4"
                        style={{
                            animation: checked
                                ? 'checkbox 50ms cubic-bezier(.41,.88,.84,-0.45) 250ms 1 normal forwards'
                                : null,
                        }}
                    />
                </svg>
            </div>
            <div class="font-bold ml-2 tracking-wide select-none text-sm tracking-wide">
                {context.slots().default}
            </div>
        </div>;
    },
    functional: true,
    model: {
        prop: 'checked',
        event: 'change',
    },
    props: {
        checked: {
            default: false,
            type: Boolean,
        },
        disabled: {
            default: false,
            type: Boolean,
        },
    },
};
</script>
