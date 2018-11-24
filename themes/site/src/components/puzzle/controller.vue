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
            depth: 1,
            deep: false,
        };
    },
    methods: {
        addDepth() {
            this.depth = Math.min(this.size, this.depth + 1);
        },
        onKeydown(e) {
            e.preventDefault();
            e.stopPropagation();
        },
        onKeyup(e) {
            if (e.key === 'Alt') {

            } else if (e.key === 'Control' || e.key === 'Meta') {
                this.deep = !this.deep;
            } else if (e.key === 'Escape') {
                this.$emit('abort');
            } else if (e.key === 'Shift') {
                this.addDepth();
            } else if (e.key === ' ') {
                this.depth = 1;
                this.deep = false;
            } else {
                // standard turns
                const turn = this.config[getKeyFromEvent(e)];
                
                if (turn) {
                    this.$emit('turn', `${this.depth}${this.deep ? turn.toLowerCase() : turn.toUpperCase() }`);
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
