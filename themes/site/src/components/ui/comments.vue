<template>
    <div>
        <div class="mb-12">
            <!-- form -->
            <form v-if="isAuthenticated" class="mb-8" @submit.prevent="submit">
                <textarea
                    v-model="body"
                    class="bg-grey-3 block h-24 leading-normal p-4 resize-y rounded w-full text-grey-8"
                    placeholder="Enter a comment"
                    required
                    :disabled="posting"
                    @blur="blur"
                    @focus="focus"
                />
                <div class="mt-8 text-right">
                    <v-button type="submit" :disabled="posting">
                        Submit
                    </v-button>
                </div>
            </form>

            <p
                class="text-center text-grey-6"
                v-else>
                Please <router-link :to="{ name: 'signin' }">sign in</router-link> or
                <router-link :to="{ name: 'create-account' }">create an account</router-link> to leave comments.
            </p>
        </div>

        <!-- comments -->
        <v-fade-transition>
            <!-- loading -->
            <div
                v-if="fetching"
                class="text-center"
                data-loading
                key="loading">
                <v-spinner />
            </div>

            <!-- empty -->
            <div
                v-else-if="empty"
                data-empty
                key="empty">
            </div>

            <!-- comments -->
            <div v-else data-comments key="comments">
                <div
                    v-for="(comment, index) in comments"
                    :class="{
                        'mt-12': index > 0,
                    }"
                    :key="comment.id">
                    <div class="bg-grey-3 mb-2 p-4 rounded">
                        <p
                            v-text="comment.body"
                            class="leading-normal text-grey-8 text-left"
                        />
                    </div>
                    <div class="text-grey-7 text-right text-sm">
                        <router-link :to="{ name: 'users:show', params: { username: comment.user.username }}">
                            {{ comment.user.username }}
                        </router-link>
                        &bull;
                        <time :datetime="comment.createdAt">{{ comment.createdAt | datestamp }}</time>
                    </div>
                </div>
            </div>
        </v-fade-transition>
    </div>
</template>

<script>
import { getComments, postComment } from '@/app/repositories/comments';
import { mapGetters } from 'vuex';

export default {
    created() {
        this.fetchComments();
    },
    data() {
        return {
            body: '',
            comments: [],
            fetching: false,
            posting: false,
        };
    },
    computed: {
        ...mapGetters('user', [
            'isAuthenticated',
        ]),
        empty() {
            return this.comments.length < 1;
        },
        model() {
            /* istanbul ignore else */
            if (this.type === 'solve') {
                return 'Speedcube\\Speedcube\\Models\\Solve';
            }

            return '';
        },
    },
    methods: {
        blur(e) {
            this.$emit('blur', e);
        },
        fetchComments() {
            this.fetching = true;

            getComments(this.type, this.id).then((response) => {
                // success
                this.body = '';
                this.comments = response.data.comments;
            }).finally(() => {
                // complete
                this.fetching = false;
            });
        },
        focus(e) {
            this.$emit('focus', e);
        },
        submit() {
            this.posting = true;

            const payload = {
                body: this.body,
                commentable_id: Number(this.id),
                commentable_type: this.model,
            };

            postComment(payload).then(() => {
                // success
                this.fetchComments();
            }).finally(() => {
                // complete
                this.posting = false;
            });
        },
    },
    props: {
        id: {
            type: [Number, String],
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
    },
};
</script>
