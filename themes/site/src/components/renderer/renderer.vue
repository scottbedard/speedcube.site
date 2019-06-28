<template>
    <div>
        Renderer
    </div>
</template>

<script>
export default {
    created() {
        this.$root.$on('scene-created', this.addScene);
        this.$root.$on('scene-destroyed', this.removeScene);
    },
    data() {
        return {
            scenes: [],
        };
    },
    computed: {
        empty() {
            return this.scenes.length === 0;
        },
    },
    methods: {
        addScene(scene) {
            this.scenes.push(scene);
        },
        removeScene(scene) {
            this.scenes = this.scenes.filter(existing => existing !== scene);
        },
    },
};
</script>
