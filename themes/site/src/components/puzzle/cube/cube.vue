<template>
    <v-box :size="100">
        <template #u>
            <v-sphere color="#0f0" />
        </template>
        <template #l>
            <v-sphere color="#ff0" />
        </template>
        <template #f>
            <v-sphere color="#0ff" />
        </template>
        <template #r>
            <v-sphere color="#f00" />
        </template>
        <template #b>
            <v-sphere color="#00f" />
        </template>
        <template #d>
            <v-sphere color="#f0f" />
        </template>
    </v-box>
</template>

<script>
import boxComponent from '../../three/geometries/box/box.vue';
import groupComponent from '../../three/group/group.vue';
import sphereComponent from '../../three/geometries/sphere/sphere.vue';

export default {
    components: {
        'v-box': boxComponent,
        'v-group': groupComponent,
        'v-sphere': sphereComponent,
    },
};
</script>
