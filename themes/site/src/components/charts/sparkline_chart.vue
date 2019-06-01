<template>
    <div>
        Hello from a sparkline
    </div>
</template>

<script>
export default {
    props: {
        values: {
            default: () => [],
            type: Array,
        },
    },
};
</script>