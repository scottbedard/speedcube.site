<script>
export default {
    render(h, context) {
        const { enterDelay, enterDuration, leaveDelay, leaveDuration, mode } = context.props;

        function onBeforeEnter(el) {
            if (enterDelay > 0) {
                el.style.transitionDelay = `${enterDelay}ms`;
            }

            if (enterDuration > 0) {
                el.style.transitionDuration = `${enterDuration}ms`;
            }
        }

        function onBeforeLeave(el) {
            if (enterDelay > 0) {
                el.style.transitionDelay = `${enterDelay}ms`;
            }

            if (enterDuration > 0) {
                el.style.transitionDuration = `${enterDuration}ms`;
            }
        }

        return <transition
            enter-active-class="trans-opacity"
            enter-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="trans-opacity"
            leave-class="opacity-100"
            leave-to-class="opacity-0"
            mode={mode}
            onBeforeEnter={onBeforeEnter}
            onBeforeLeave={onBeforeLeave}>
            {context.slots().default}
        </transition>;
    },
    functional: true,
    props: {
        enterDelay: {
            default: 0,
            type: Number,
        },
        enterDuration: {
            default: 0,
            type: Number,
        },
        leaveDelay: {
            default: 0,
            type: Number,
        },
        leaveDuration: {
            default: 0,
            type: Number,
        },
        mode: {
            default: 'out-in',
            type: String,
        },
    },
};
</script>
