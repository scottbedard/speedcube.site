<script>
import { noop } from 'lodash-es';
import { bindExternalEvent } from '@/app/utils/component';

const defaultKeymap = {
    // face turns
    'J': 'U',
    'F': 'U-',
    'D': 'L',
    'E': 'L-',
    'H': 'F',
    'G': 'F-',
    'I': 'R',
    'K': 'R-',
    'W': 'B',
    'O': 'B-',
    'S': 'D',
    'L': 'D-',

    // cube rotations
    'A': 'Y-',
    ';': 'Y',
    'R': 'X',
    'U': 'X',
    'T': 'X',
    'Y': 'X',
    'V': 'X-',
    'C': 'X-',
    'N': 'X-',
    'M': 'X-',
    'Q': 'Z-',
    'P': 'Z',
}

// helper function to translate key events to input values
function getKeyFromEvent(e) {
    return String(e.key).toUpperCase();
}

export default {
    created() {
        bindExternalEvent(this, document.body, 'keydown', this.onKeydown);
        bindExternalEvent(this, document.body, 'keyup', this.onKeyup);
    },
    data() {
        return {
            // ...
        };
    },
    methods: {
        onKeydown(e) {
            e.preventDefault();
            e.stopPropagation();
        },
        onKeyup(e) {
            if (e.key === 'Alt') {
                // ...
            } else if (e.key === 'Control' || e.key === 'Meta') {
                // ...
            } else if (e.key === 'Escape') {
                // ...
            } else if (e.key === 'Shift') {
                // ...
            } else if (e.key === ' ') {
                this.$emit('space-up');
            } else {
                // standard turns
                const turn = this.config[getKeyFromEvent(e)];
                
                if (turn) {
                    const depth = this.depth > 1 ? this.depth : '';

                    this.$emit('turn', `${depth}${this.deep ? turn.toLowerCase() : turn.toUpperCase()}`);
                }
            }
        },
    },
    props: {
        config: {
            default() {
                return defaultKeymap;
            },
            type: Object,
        },
        size: {
            required: true,
            type: Number,
        },
    },
    render: noop,
};
</script>
