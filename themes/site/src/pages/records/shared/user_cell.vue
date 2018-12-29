<script>
export default {
    render(h, context) {
        const { row, value } = context.props;

        return <div>
            <div class="font-bold mb-2">
                { value.name || value.username || 'Anonymous' }
            </div>
            <div class="text-xs">
                { row.createdAt }
            </div>
        </div>;
    },
    functional: true,
    props: [
        'row',
        'value',
    ],
};
</script>