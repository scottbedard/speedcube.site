<template>
    <div>
        Hello from the puzzle component
    </div>
</template>

<script>
export default {
    props: {
        model: {
            required: true,
            type: Object,
        },
        type: {
            required: true,
            type: String,
        },
    },
};
</script>
