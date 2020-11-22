<template>
  <svg
    v-bind="icon.attrs"
    v-html="contents"
    :height="height || sizePx"
    :stroke-width="stroke"
    :width="width || sizePx" />
</template>

<script>
// https://feathericons.com
import feather from 'feather-icons';

export default {
  computed: {
    contents() {
      return this.icon?.toString();
    },
    icon() {
      return feather.icons[this.name];
    },
    sizePx() {
      return Number(this.size) * 4;
    },
  },
  props: {
    height: {
      type: Number,
    },
    name: {
      required: true,
      type: String,
    },
    size: {
      default: 4,
      type: [Number, String],
    },
    stroke: {
      default: 2,
      type: [Number, String],
    },
    width: {
      type: Number,
    },
  },
};
</script>
