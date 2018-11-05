<script>
export default {
    render(h, context) {
        const { to } = context.props;
        
        return <router-link
            to={to}>
            {context.slots().default}
        </router-link>;
    },
    functional: true,
    props: [
        'to',
    ],
};
</script>