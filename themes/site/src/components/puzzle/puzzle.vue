<style lang="scss" scoped>
    .v-puzzle {
        perspective: 800px;
        perspective-origin: 50% 100px;
    }

    .inner {
        position: relative;
        width: 0px;
        left: 50%;
        transform-style: preserve-3d;
        transform: rotateX(-20deg);
    }
</style>

<template>
    <div class="v-puzzle">
        <div class="inner">
            <template v-for="face in faces">
                <div
                    v-for="(sticker, index) in cube.state[face]"
                    class="sticker absolute"
                    :key="`${face}-${index}`"
                    :style="{
                        left: `-${halfEdgePx}`,
                        transform: transform(face, index),
                        height: edgePx,
                        width: edgePx,
                    }">
                    <div
                        v-text="index"
                        class="absolute border"
                        :style="{
                            height: stickerPx,
                            left: stickerLeftPx(index),
                            top: stickerTopPx(index),
                            width: stickerPx,
                        }"
                    />
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import Cube from 'bedard-cube';

export default {
    beforeDestroy() {
        
    },
    data() {
        return {
            currentTurn: null,
            cube: new Cube(this.size),
            paused: false,
        };
    },
    mounted() {
        
    },
    computed: {
        edgeSize() {
            // the pixel dimension for one edge of the cube
            // in other words, the "total height" of the cube
            return 300;
        },
        edgePx() {
            return `${this.edgeSize}px`;
        },
        halfEdgeSize() {
            return this.edgeSize / 2;
        },
        halfEdgePx() {
            return `${this.halfEdgeSize}px`;
        },
        stickerLeftPx() {
            return i => `${(i % this.size) * this.stickerSize}px`;
        },
        stickerTopPx() {
            return i => `${Math.floor((i / this.size)) * this.stickerSize}px`;
        },
        stickerSize() {
            return this.edgeSize / this.size;
        },
        stickerPx() {
            return `${this.stickerSize}px`;
        },
        faces() {
            return ['u', 'l', 'f', 'r', 'b', 'd'];
        },
        stickersPerFace() {
            return this.size ** 2;
        },
        transform() {
            return (face, index) => {
                const rotations = [
                    `rotateX(0deg)`,
                    `rotateY(0deg)`,
                    `rotateZ(0deg)`,
                ];

                rotations.push(this.positionSticker(face));

                return rotations.join(' ');
            }
        },
    },
    methods: {
        positionSticker(face) {
            switch (face) {
                case 'u': return `translateY(-50%) rotateX(90deg)`;
                case 'l': return `translateX(-50%) rotateY(-90deg)`;
                case 'f': return `translateZ(${this.halfEdgePx})`;
                case 'r': return `translateX(50%) rotateY(90deg)`;
                case 'b': return `translateZ(-${this.halfEdgePx}) rotateY(180deg)`;
                case 'd': return `translateY(${this.halfEdgePx}) rotateX(-90deg)`
            }
        },
    },
    props: {
        size: {
            required: true,
            type: Number,
        },
    },
};
</script>
