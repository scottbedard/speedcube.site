<template>
  <div class="flex flex-wrap gap-x-6 gap-y-4 justify-end">
    <div
      v-if="secondaryLinkText"
      class="flex flex-1 items-center justify-center w-full xs:justify-start xs:w-auto">
      <a
        href="#"
        :class="{
          'hover:text-red-500': secondaryLinkTheme === 'danger', 
        }"
        @click.prevent="onSecondaryLinkClick">
        <IconText
          v-if="secondaryLinkIcon"
          :name="secondaryLinkIcon">
          {{ secondaryLinkText }}
        </IconText>

        <span
          v-else
          v-text="secondaryLinkText" />
      </a>
    </div>

    <div class="flex flex-wrap gap-x-6 gap-y-4 items-center justify-center w-full xs:flex-nowrap xs:w-auto">
      <a
        v-if="primaryLinkText"
        v-text="primaryLinkText"
        class="whitespace-nowrap"
        href="#"
        @click.prevent="onPrimaryLinkClick" />

      <Button
        v-text="buttonText"
        class="w-full"
        :danger="buttonTheme === 'danger'"
        :primary="buttonTheme === 'primary'"
        @click="onButtonClick" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Button from './Button.vue'
import IconText from './IconText.vue'

export default defineComponent({
  setup(props, { emit }) {
    const onButtonClick = (e: Event) => {
      emit('button-click', e)
    }

    const onPrimaryLinkClick = (e: Event) => {
      emit('primary-link-click', e)
    }

    const onSecondaryLinkClick = (e: Event) => {
      emit('secondary-link-click', e)
    }

    return {
      onButtonClick,
      onPrimaryLinkClick,
      onSecondaryLinkClick,
    }
  },
  components: {
    Button,
    IconText,
  },
  emits: [
    'button-click',
    'primary-link-click',
    'secondary-link-click',
  ],
  name: 'ActionBar',
  props: {
    buttonTheme: {
      default: 'primary',
      type: String as PropType<'danger' | 'primary'>
    },
    buttonText: {
      type: String,
    },
    primaryLinkText: {
      type: String,
    },
    secondaryLinkIcon: {
      type: String,
    },
    secondaryLinkText: {
      type: String,
    },
    secondaryLinkTheme: {
      default: null,
      type: String as PropType<null | 'danger'>,
    },
  },
})
</script>