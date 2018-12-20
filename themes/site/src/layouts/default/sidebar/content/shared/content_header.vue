<script>
export default {
    render(h, context) {
        return <h3 class="font-bold text-grey-6 text-sm tracking-wide">
            {context.slots().default}
        </h3>;
    },
    functional: true,
};
</script>
