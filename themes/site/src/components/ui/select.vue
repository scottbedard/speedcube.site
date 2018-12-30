<script>
export default {
    render(h, context) {
        const { options } = context.props;

        return <div>
            <select>

            </select>
        </div>;
    },
    functional: true,
    props: {
        options: {
            default: () => [],
            type: Array,
        },
    },
};
</script>