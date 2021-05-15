<template>
  <div class="grid gap-6">
    <div>
      <div class="mb-2">Button only</div>
      <div class="border-4 border-dashed border-gray-300 max-w-xl p-3 dark:border-gray-600">
        <ActionBar
          button-text="Save"
          @button-click="onButtonClick" />
      </div>
    </div>

    <div>
      <div class="mb-2">Button and primary link</div>
      <div class="border-4 border-dashed border-gray-300 max-w-xl p-3 dark:border-gray-600">
        <ActionBar
          button-text="Save"
          primary-link-text="Cancel"
          @button-click="onButtonClick"
          @primary-link-click="onPrimaryLinkClick" />
      </div>
    </div>

    <div>
      <div class="mb-2">Button and both links</div>
      <div class="border-4 border-dashed border-gray-300 max-w-xl p-3 dark:border-gray-600">
        <ActionBar
          button-text="Save"
          primary-link-text="Cancel"
          secondary-link-icon="trash"
          secondary-link-text="Delete"
          secondary-link-theme="danger"
          @button-click="onButtonClick"
          @primary-link-click="onPrimaryLinkClick"
          @secondary-link-click="onSecondaryLinkClick" />
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { ActionBar } from '@/components'
import { defineComponent } from 'vue'
import { alert } from '@/app/alerts'

export default defineComponent({
  setup() {
    const onButtonClick = () => alert({ text: 'Button clicked' })
    const onPrimaryLinkClick = () => alert({ text: 'Primary link clicked' })
    const onSecondaryLinkClick = () => alert({ text: 'Secondary link clicked' })

    return {
      onButtonClick,
      onPrimaryLinkClick,
      onSecondaryLinkClick,
    }
  },
  components: {
    ActionBar
  },
  name: 'ActionBarExample',
})
</script>
