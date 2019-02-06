<script>
/* eslint-disable no-param-reassign */

function onBeforeEnter(el) {
    // get the entering element ready to be transitioned
    el.style.opacity = 0;
    el.style.transition = `opacity ${this.props.duration / 2}ms ${this.props.fadeInCurve}`;
    el.style.willChange = 'opacity';
}

function onBeforeLeave(el) {
    // get the leaving element ready to be transitioned
    el.style.opacity = 1;
    el.style.transition = `opacity ${this.props.duration / 2}ms ${this.props.fadeOutCurve}`;
    el.style.willChange = 'opacity';
}

function onLeave(el, done) {
    // fix the height of our container
    el.parentElement.style.height = `${el.offsetHeight}px`;

    // make the leaving element fade out
    el.style.opacity = 0;

    // remove the leaving element from the dom after it fades out
    setTimeout(done, this.props.duration / 2);
}

function onEnter(el, done) {
    // prevent the transitioning elements from overflowing our container
    el.parentElement.style.overflow = 'hidden';
    el.parentElement.style.transition = `height ${this.props.duration}ms ${this.props.heightCurve}`;
    el.parentElement.style.willChange = 'height';

    // set the new height of our wrapper element
    el.parentElement.style.height = `${el.offsetHeight}px`;

    // wait for the leaving element to fade out, then fade in the entering one
    setTimeout(() => {
        el.style.opacity = 1;

        // and when that transition is complete, end the entering element phase
        setTimeout(done, this.props.duration / 2);
    }, this.props.duration / 2);
}

function onAfterEnter(el) {
    // remove inline styles from the entering element
    el.removeAttribute('style');
}

function onTransitionEnd(e) {
    // when the transitions are over remove inline styles from our wrapper
    if (e.target.classList.contains('v-collapse-transition')) {
        e.target.removeAttribute('style');
    }
}

export default {
    render(h, context) {
        return <div
            class="v-collapse-transition"
            onTransitionend={onTransitionEnd}>
            <transition
                css={false}
                onAfterEnter={onAfterEnter}
                onBeforeEnter={onBeforeEnter.bind(context)}
                onBeforeLeave={onBeforeLeave.bind(context)}
                onEnter={onEnter.bind(context)}
                onLeave={onLeave.bind(context)}>
                {context.slots().default || <div key="v-collapse-transition-placeholder" />}
            </transition>
        </div>;
    },
    functional: true,
    props: {
        duration: {
            default: 250,
            type: Number,
        },
        fadeOutCurve: {
            default: 'ease-out',
            type: String,
        },
        fadeInCurve: {
            default: 'ease-in',
            type: String,
        },
        heightCurve: {
            default: 'ease-in-out',
            type: String,
        },
    },
};
</script>
