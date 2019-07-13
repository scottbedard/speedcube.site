<template>
    <div>
        <div class="border-4 border-dashed relative">
            <div class="pb-full">
                <v-puzzle
                    :config="normalizedConfig"
                    :current-turn="currentTurn && currentTurn.value"
                    :model="model"
                    :turn-progress="turnProgress"
                    :type="type"
                />
            </div>
        </div>

        <pre>{{ inspection }}</pre>
    </div>
</template>

<script>
import Cube from 'bedard-cube';
import { cloneDeep, get } from 'lodash-es';
import puzzleComponent from '@/components/puzzle/puzzle.vue';
import { applyCubeState, isCube } from '@/app/utils/puzzle';
import { puzzleTypes } from '@/app/constants';

const alg = moves => moves
    .filter(obj => obj.type === 'turn')
    .map(obj => obj.value)
    .join(' ');

export default {
    data() {
        return {
            model: this.createModel(),
        };
    },
    components: {
        'v-puzzle': puzzleComponent,
    },
    computed: {
        duration() {
            const match = this.solution.match(/([0-9]+)#END$/);

            return match === null ? 0 : parseInt(match[1], 10);
        },
        currentMove() {
            const nextMoveIndex = this.moves.findIndex(move => move.time > this.timeOffset);

            for (let i = nextMoveIndex - 1; i > -1; i -= 1) {
                return this.moves[i];
            }

            return null;
        },
        currentMoveIndex() {
            if (this.currentMove) {
                return this.moves.indexOf(this.currentMove);
            }

            return -1;
        },
        currentTurn() {
            const nextMoveIndex = this.moves.findIndex(move => move.time > this.timeOffset);

            for (let i = nextMoveIndex - 1; i > -1; i -= 1) {
                const move = this.moves[i];

                if (move.type === 'turn') {
                    return move;
                }
            }

            return null;
        },
        currentTurnIndex() {
            if (this.currentTurn) {
                return this.moves.indexOf(this.currentTurn);
            }

            return -1;
        },
        firstMove() {
            if (this.moves.length) {
                return this.moves[0];
            }

            return null;
        },
        inspection() {
            if (this.timeOffset < this.firstMove.time) {
                return true;
            }

            const startIndex = this.moves
                .slice(0, this.currentTurnIndex)
                .findIndex(move => move.type === 'event' && move.value === 'START');

            return startIndex === -1;
        },
        moves() {
            return this.solution.split(' ').map((move) => {
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
        previousTurns() {
            return this.moves.slice(0, this.currentTurnIndex);
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
        applyTurns(model, turns) {
            // cube
            if (isCube(this.type)) {
                model.turn(turns);
            }
        },
        createModel() {
            let model;

            // cube
            if (isCube(this.type)) {
                const size = parseInt(this.type, 10);

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
    watch: {
        currentTurnIndex(currentTurnIndex) {
            const model = this.createModel();

            if (this.progress === 1) {
                this.applyTurns(model, alg(this.moves));
            } else if (currentTurnIndex > -1 && this.previousTurns) {
                this.applyTurns(model, alg(this.previousTurns));
            }

            this.model = model;
        },
    },
};
</script>
