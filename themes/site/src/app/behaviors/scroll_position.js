import { reactive, onBeforeUnmount } from '@vue/composition-api';

/**
 * Track scroll position.
 *
 * @return {Object}
 */
export function useScrollPosition() {
    const scrollPosition = reactive({
        x: window.scrollX,
        y: window.scrollY,
    });

    const syncScrollPosition = () => {
        scrollPosition.x = window.scrollX;
        scrollPosition.y = window.scrollY;
    };

    window.addEventListener('scroll', syncScrollPosition, false);

    onBeforeUnmount(() => {
        window.removeEventListener('scroll', syncScrollPosition, false);
    });

    return {
        scrollPosition,
        syncScrollPosition,
    };
}
