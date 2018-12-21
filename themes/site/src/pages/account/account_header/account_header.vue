<script>
export default {
    render(h, context) {
        return <h3 class="font-bold mb-4 text-grey-6 text tracking-wide">
            {context.slots().default}
        </h3>;
    },
    functional: true,
};
</script>
