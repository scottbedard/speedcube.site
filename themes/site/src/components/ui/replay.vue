<template>
    <div>
        Hello
    </div>
</template>

<script>
import Cube from 'bedard-cube';
import { applyCubeState, isCube } from '@/app/utils/puzzle';
import { puzzleTypes } from '@/app/constants';
import { get } from 'lodash-es';

export default {
    data() {
        return {
            model: this.createModel(),
        };
    },
    computed: {
        duration() {
            const match = this.solution.match(/([0-9]+)#END$/);

            return match === null ? 0 : parseInt(match[1], 10);
        },
        currentTurn() {
            const nextMoveIndex = this.moves.findIndex(move => move.time > this.timeOffset);
            
            for (let i = nextMoveIndex - 1; i > -1; i--) {
                const move = this.moves[i];

                if (move.type === 'turn') {
                    return move;
                }
            }
            
            return null;
        },
        moves() {
            return this.solution.split(' ').map(move => {
                const time = parseInt(move, 10);
                const value = move.slice(Math.floor(Math.log10(time)) + 2);

                let type = 'unknown';
                
                if (move.indexOf(':') > -1) {
                    type = 'turn';
                } else if (move.indexOf('#') > -1) {
                    type = 'event';
                }
                
                return { time, type, value };
            });
        },
        normalizedConfig() {
            if (typeof this.config === 'string') {
                try {
                    return JSON.parse(this.config);
                } catch (e) {
                    console.log('Invalid config', this.config);
                }

                return {};
            }

            return this.config;
        },
        timeOffset() {
            return this.duration * this.progress;
        },
        turnDuration() {
            return Number(get(this.normalizedConfig, 'turnDuration', 0));
        },
        turnProgress() {
            if (!this.currentTurn) {
                return 0;
            }
            
            return Math.min(1, (this.timeOffset - this.currentTurn.time) / this.turnDuration);
        },
    },
    methods: {
        createModel() {
            let model;

            // cube
            if (isCube(this.type)) {
                const size = parseInt(this.type);

                model = new Cube(size, { useObjects: true });

                if (this.scrambledState) {
                    applyCubeState(model, this.scrambledState);
                }
            }

            return model;
        },
    },
    props: {
        config: {
            default: '{}',
            type: [String, Object],
        },
        progress: {
            default: 0,
            type: Number,
            validator: progress => progress >= 0 && progress <= 1,
        },
        scrambledState: {
            required: true,
            type: String,
        },
        solution: {
            required: true,
            type: String,
        },
        type: {
            required: true,
            type: String,
            validator: type => puzzleTypes.includes(type),
        },
    },
};
</script>