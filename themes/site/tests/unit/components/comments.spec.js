/* eslint-disable */
import axios from 'axios';
import commentsComponent from '@/components/ui/comments.vue';

//
// fixtures
//
import { commentsFixture, emptyCommentsFixture } from '~/fixtures/comments';
import { postSigninFixture } from '~/fixtures/user';

//
// factory
//
const mount = factory({
    components: {
        'v-comments': commentsComponent,
    },
});

//
// specs
//
describe('<v-comments>', () => {
    beforeEach(() => {
        stubRequests({
            get: {
                '/api/speedcube/speedcube/comments/solve/1': emptyCommentsFixture,
                '/api/speedcube/speedcube/comments/solve/2': commentsFixture,
            },
            post: {
                '/api/rainlab/user/signin': postSigninFixture,
                '/api/speedcube/speedcube/comments': () => {},
            },
        });
    });

    it('displays a loading state while comments are being fetched', async () => {
        const vm = mount({
            template: `<v-comments id="2" type="solve" />`,
        });

        expect(vm.$el.querySelector('[data-loading]')).not.toBe(null);
        expect(vm.$el.querySelector('[data-comments]')).toBe(null);

        expect(axios.get).toHaveBeenCalledWith('/api/speedcube/speedcube/comments/solve/2');

        await timeout(100);

        expect(vm.$el.querySelector('[data-loading]')).toBe(null);
        expect(vm.$el.querySelector('[data-comments]')).not.toBe(null);
    });

    it('can be commented on by users', async () => {
        const vm = mount({
            template: `<v-comments id="1" type="solve" />`,
        }, {
            user: {
                user: user(),
            },
        });

        axios.get.mockClear();

        const form = vm.$el.querySelector('form');
        expect(form).not.toBe(null);

        input('Wow, what an awesome solve!', form.querySelector('textarea'));
        submit(form);

        expect(axios.post).toHaveBeenCalledWith('/api/speedcube/speedcube/comments', {
            body: 'Wow, what an awesome solve!',
            commentable_id: 1,
            commentable_type: 'Speedcube\\Speedcube\\Models\\Solve',
        });

        await vm.$nextTick();

        expect(axios.get).toHaveBeenCalledWith('/api/speedcube/speedcube/comments/solve/1');
    });

    it('cannot be commented on by guests', () => {
        const vm = mount({
            template: `<v-comments id="1" type="solve" />`,
        });
        
        expect(vm.$el.querySelector('form')).toBe(null);
    });

    it('displays an empty message if there are no comments', async () => {
        const vm = mount({
            template: `<v-comments id="1" type="solve" />`,
        });

        await timeout(100);

        expect(vm.$el.querySelector('[data-empty]')).not.toBe(null);
    });

    it('emits a focus and blur event', () => {
        const onBlur = jest.fn();
        const onFocus = jest.fn();

        const vm = mount({
            methods: {
                onBlur,
                onFocus,
            },
            template: `
                <v-comments
                    id="1"
                    type="solve"
                    @blur="onBlur"
                    @focus="onFocus"
                />
            `,
        }, {
            user: {
                user: user(),
            },
        });
        
        simulate('focus', vm.$el.querySelector('textarea'));
        expect(onFocus).toHaveBeenCalled();

        simulate('blur', vm.$el.querySelector('textarea'));
        expect(onBlur).toHaveBeenCalled();
    });
});