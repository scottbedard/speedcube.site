<script>
import { bindAll } from 'spyfu-vue-functional';
import { get } from 'lodash-es';

export default {
    render(h, context) {
        const { size, user } = context.props;
        const bindings = bindAll(context);

        let sizeClasses;

        // size
        if (size === 'md') {
            sizeClasses = 'h-10 w-10';
        } else if (size === 'lg') {
            sizeClasses = 'h-16 w-16';
        } else if (size === 'xl') {
            sizeClasses = 'h-24 w-24';
        } else if (size === '2xl') {
            sizeClasses = 'h-48 w-48';
        }

        return <span {...bindings}>
            {/* no avatar */}
            {
                user.avatar === null
                && <div
                    class={[
                        'border-2 border-grey-4 inline-flex items-center justify-center rounded-full overflow-hidden',
                        sizeClasses,
                    ]}>
                    <svg
                        version="1.1"
                        viewBox="0 0 409.165 409.164"
                        width="100%"
                        x="0px"
                        xmlSpace="preserve"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        y="0px">
                        <g>
                            <path
                                d="M204.583,216.671c50.664,0,91.74-48.075,91.74-107.378c0-82.237-41.074-107.377-91.74-107.377 c-50.668,0-91.74,25.14-91.74,107.377C112.844,168.596,153.916,216.671,204.583,216.671z"
                                fill="#52606D"
                            />
                            <path
                                d="M407.164,374.717L360.88,270.454c-2.117-4.771-5.836-8.728-10.465-11.138l-71.83-37.392 c-1.584-0.823-3.502-0.663-4.926,0.415c-20.316,15.366-44.203,23.488-69.076,23.488c-24.877,0-48.762-8.122-69.078-23.488 c-1.428-1.078-3.346-1.238-4.93-0.415L58.75,259.316c-4.631,2.41-8.346,6.365-10.465,11.138L2.001,374.717 c-3.191,7.188-2.537,15.412,1.75,22.005c4.285,6.592,11.537,10.526,19.4,10.526h362.861c7.863,0,15.117-3.936,19.402-10.527 C409.699,390.129,410.355,381.902,407.164,374.717z"
                                fill="#52606D"
                            />
                        </g>
                    </svg>
                </div>
            }

            {/* avatar */}
            {
                user.avatar !== null
                && <div
                    class={[
                        'inline-flex items-center justify-center rounded-full overflow-hidden',
                        sizeClasses,
                    ]}>
                    <img
                        class="rounded-full shadow-inner w-full"
                        src={get(user, 'avatar.path', '')}
                    />
                </div>
            }
        </span>;
    },
    functional: true,
    props: {
        size: {
            default: 'md',
            type: String,
        },
        user: {
            required: true,
            type: Object,
        },
    },
};
</script>
