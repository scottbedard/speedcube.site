<template>
    <div>
        Cube control customization coming soon...
    </div>
</template>

<script>
import { bindExternalEvent } from '@/app/utils/component';

export default {
    mounted() {
        bindExternalEvent(this, document.body, 'keypress', this.onKeypress);
    },
    methods: {
        onKeypress(e) {
            console.log('keypress', e);
        },
    },
};
</script>