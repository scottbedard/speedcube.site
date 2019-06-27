<style lang="scss" scoped>
    span {
        animation: spin 1s infinite linear;
        background-position: 50% 50%;
        display: inline-block;
    }

    path {
        stroke: theme('colors.grey-5');
    }

    @keyframes spin {
        0% { transform: rotate(0deg) }
        100% { transform: rotate(359deg) }
    }
</style>

<script>
export default {
    render(h, context) {
        const { color, size } = context.props;

        // size
        let sizePx = '36px'; // md

        if (size === 'sm') {
            sizePx = '24px';
        } else if (size === 'lg') {
            sizePx = '48px';
        }

        return <span
            class="v-spinner"
            style={{ height: sizePx, width: sizePx }}>
            <svg
                x="0px"
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 134 73 41 41"
                height={sizePx}
                version="1.1"
                viewBox="134 73 41 41"
                width={sizePx}
                xmlSpace="preserve"
                xmlnsA="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                y="0px">
                <path
                    d="M142.114,105.059 c-4.002-4.376-5.601-10.721-3.64-16.765c1.318-4.052,4.011-7.271,7.39-9.312"
                    data-color={color}
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="5.28"
                />
            </svg>
        </span>;
    },
    functional: true,
    props: {
        color: {
            default: 'primary',
            type: String,
        },
        size: {
            default: 'md',
            type: String,
        },
    },
};
</script>
