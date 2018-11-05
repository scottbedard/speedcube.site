<script>
export default {
    render(h, context) {
        const { mode } = context.props;

        return <transition
            enter-active-class="trans-opacity"
            enter-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="trans-opacity"
            leave-class="opacity-100"
            leave-to-class="opacity-0"
            mode={mode}>
            {context.slots().default}
        </transition>;
    },
    functional: true,
    props: {
        mode: {
            default: 'out-in',
            type: String,
        },
    },
};
</script>
