<template>
    <div>
        Overview!
    </div>
</template>

<script>
export default {
    created() {
        this.fetchUser();
    },
    data() {
        return {
            isLoading: false,
        };
    },
    methods: {
        fetchUser() {
            console.log('fetching the user');
        },
    },
};
</script>