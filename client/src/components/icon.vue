<template>
  <svg
    v-bind="icon.attrs"
    v-html="contents"
    :stroke-width="stroke" />
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
  },
  props: {
    name: {
      required: true,
      type: String,
    },
    stroke: {
      default: 2,
      type: [Number, String],
    },
  },
};
</script>
