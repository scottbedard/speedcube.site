<script>
export default {
    render(h, context) {
        return <h3 class="font-normal mb-4 text-grey-6 tracking-wide">
            {context.slots().default}
        </h3>;
    },
    functional: true,
};
</script>
