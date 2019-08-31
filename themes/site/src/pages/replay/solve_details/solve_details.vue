<template>
    <div class="leading-normal max-w-md mx-auto text-left tracking-widest">
        <div class="mb-6">
            <div class="font-bold mb-1 text-grey-5 text-xs uppercase">Scramble:</div>
            <div v-text="scramble" />
        </div>
        <div class="mb-6">
            <div class="font-bold mb-1 text-grey-5 text-xs uppercase">Inspection:</div>
            <div v-text="inspection" />
        </div>
        <div>
            <div class="font-bold mb-1 text-grey-5 text-xs uppercase">Solution:</div>
            <div v-text="solution" />
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'inspection',
        'scramble',
        'solution',
    ],
};
</script>
