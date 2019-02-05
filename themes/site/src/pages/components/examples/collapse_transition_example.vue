<template>
    <v-example title="<v-collapse-transition>">
        <p class="mb-8">
            A fade transition for elements of unknown height. If you do not need a smooth transition in height, consider using a
            <router-link
                class="font-mono"
                :to="{ query: { filter: 'v-fade-transition' } }">
                &lt;v-fade-transition&gt;
            </router-link>
            transition instead.
        </p>

        <v-button
            class="mb-8"
            size="sm"
            outlined
            @click="value = !value">
            Toggle
        </v-button>

        <div class="border-2 border-dashed border-grey-5 p-8 text-grey-8">
            <v-collapse-transition>
                <div v-if="value" key="a">
                    <p class="mb-4">Everybody's different. Trees are different. Let them all be individuals. Nice little clouds playing around in the sky. All kinds of happy little splashes. There it is. The man who does the best job is the one who is happy at his job.</p>
                    <p>Let's put some happy little bushes on the other side now. Only think about one thing at a time. Don't get greedy. Let's have a happy little tree in here. This is probably the greatest thing to happen in my life - to be able to share this with you. We don't want to set these clouds on fire. There is immense joy in just watching - watching all the little creatures in nature.</p>
                </div>
                <div v-else key="b">
                    <p>You've got to learn to fight the temptation to resist these things. Just let them happen. Talk to trees, look at the birds. Whatever it takes. This is a happy place, little squirrels live here and play. Let's just drop a little Evergreen right here.</p>
                </div>
            </v-collapse-transition>
        </div>

    </v-example>
</template>

<script>
import exampleComponent from '../example.vue';

export default {
    data() {
        return {
            value: true,
        };
    },
    components: {
        'v-example': exampleComponent,
    },
};
</script>
