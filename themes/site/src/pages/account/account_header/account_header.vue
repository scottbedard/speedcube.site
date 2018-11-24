<script>
export default {
    render(h, context) {
        return <h3 class="font-thin mb-8 text-3xl">
            {context.slots().default}
        </h3>;
    },
    functional: true,
};
</script>
