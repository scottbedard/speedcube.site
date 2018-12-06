<template>
    <div class="font-thin text-4xl text-grey-dark">
        {{ minutes }}:{{ seconds }}.{{ milliseconds }}
    </div>
</template>

<script>
export default {
    computed: {
        milliseconds() {
            return (this.time % 1000).toString().padStart(2, '0').slice(0, 2);
        },
        minutes() {
            return Math.floor(this.time / 60000);
        },
        seconds() {
            return (Math.floor(this.time / 1000) % 60).toString().padStart(2, '0');
        },
    },
    props: [
        'time',
    ],
};
</script>
