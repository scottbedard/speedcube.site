<style lang="scss" scoped>
@use "sass:math";

$contrast: 5%;
$thumb-border-color: #eceff1;
$thumb-border-width: 0px;
$thumb-color: #38A169;
$thumb-height: 16px;
$thumb-radius: 8px;
$thumb-shadow-blur: 0px;
$thumb-shadow-color: rgba(0, 0, 0, .2);
$thumb-shadow-size: 0px;
$thumb-width: 16px;
$track-border-color: #cfd8dc;
$track-border-width: 0px;
$track-color: #52606D;
$track-height: 4px;
$track-radius: 2px;
$track-shadow-blur: 0px;
$track-shadow-color: rgba(0, 0, 0, .2);
$track-shadow-size: 0px;
$track-width: 100%;
$ie-bottom-track-color: darken($track-color, $contrast);

@mixin shadow($shadow-size, $shadow-blur, $shadow-color) {
  box-shadow: $shadow-size $shadow-size $shadow-blur $shadow-color, 0 0 $shadow-size lighten($shadow-color, 5%);
}

@mixin track {
  cursor: default;
  height: $track-height;
  transition: all .2s ease;
  width: $track-width;
}

@mixin thumb {
  @include shadow($thumb-shadow-size, $thumb-shadow-blur, $thumb-shadow-color);
  background: $thumb-color;
  border: $thumb-border-width solid $thumb-border-color;
  border-radius: $thumb-radius;
  box-sizing: border-box;
  cursor: grab;
  height: $thumb-height;
  width: $thumb-width;

  &:active {
    cursor: grabbing;
  }
}

[type="range"] {
  -webkit-appearance: none;
  background: transparent;
  margin: math.div($thumb-height, 2) 0;
  width: $track-width;

  &::-moz-focus-outer {
    border: 0;
  }

  &:focus {
    outline: 0;

    &::-webkit-slider-runnable-track {
      background: lighten($track-color, $contrast);
    }

    &::-ms-fill-lower {
      background: $track-color;
    }

    &::-ms-fill-upper {
      background: lighten($track-color, $contrast);
    }
  }

  &::-webkit-slider-runnable-track {
    @include track;
    @include shadow($track-shadow-size, $track-shadow-blur, $track-shadow-color);
    background: $track-color;
    border: $track-border-width solid $track-border-color;
    border-radius: $track-radius;
  }

  &::-webkit-slider-thumb {
    @include thumb;
    -webkit-appearance: none;
    margin-top: math.div((-$track-border-width * 2 + $track-height), 2) - math.div($thumb-height, 2);
  }

  &::-moz-range-track {
    @include shadow($track-shadow-size, $track-shadow-blur, $track-shadow-color);
    @include track;
    background: $track-color;
    border: $track-border-width solid $track-border-color;
    border-radius: $track-radius;
    height: math.div($track-height, 2);
  }

  &::-moz-range-thumb {
    @include thumb;
  }

  &::-ms-track {
    @include track;
    background: transparent;
    border-color: transparent;
    border-width: math.div($thumb-height, 2) 0;
    color: transparent;
  }

  &::-ms-fill-lower {
    @include shadow($track-shadow-size, $track-shadow-blur, $track-shadow-color);
    background: $ie-bottom-track-color;
    border: $track-border-width solid $track-border-color;
    border-radius: $track-radius * 2;
  }

  &::-ms-fill-upper {
    @include shadow($track-shadow-size, $track-shadow-blur, $track-shadow-color);
    background: $track-color;
    border: $track-border-width solid $track-border-color;
    border-radius: $track-radius * 2;
  }

  &::-ms-thumb {
    @include thumb;
    margin-top: math.div($track-height, 4);
  }

  &:disabled {
    &::-webkit-slider-thumb,
    &::-moz-range-thumb,
    &::-ms-thumb,
    &::-webkit-slider-runnable-track,
    &::-ms-fill-lower,
    &::-ms-fill-upper {
      cursor: not-allowed;
    }
  }
}
</style>

<template>
  <div>
    <Label
      v-if="label"
      class="mb-1"
      :for="id"
      :text="label" />
    <input
      type="range"
      :id="id"
      :max="max"
      :min="min"
      :step="step"
      :value="modelValue"
      @input="onInput" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { uniqueId } from 'lodash-es'
import Label from './Label.vue'

export default defineComponent({
  setup(props, { emit }) {
    const onInput = (e: Event) => {
      emit('update:modelValue', Number((e.target as HTMLInputElement).value))
    }

    return {
      onInput
    }
  },
  components: {
    Label,
  },
  props: {
    id: {
      default: () => `range-input-${uniqueId()}`,
      type: String,
    },
    label: String,
    max: Number,
    min: Number,
    modelValue: Number,
    step: Number,
  },
})
</script>
