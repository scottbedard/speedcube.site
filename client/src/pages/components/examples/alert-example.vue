<template>
  <div class="font-mono gap-6 grid">
    <a
      href="#"
      @click.prevent="onClick('default')">
      fireAlert('...')
    </a>
    <a
      href="#"
      @click.prevent="onClick('success')">
      fireAlert({ message, type: 'success' })
    </a>
    <a
      href="#"
      @click.prevent="onClick('danger')">
      fireAlert({ message, type: 'danger' })
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { fireAlert } from '@/app/store/alert/actions';
import { sample } from 'lodash-es';

const bobRoss = [
  'Even the worst thing we can do here is good',
  'Maybe there is a happy little Evergreen that lives here',
  'The light is your friend, preserve it',
  'This painting comes right out of your heart',
  'We artists are a different breed of people',
  'Trees cover up a multitude of sins',
]

export default defineComponent({
  setup() {
    const onClick = (type: 'danger' | 'default' | 'success') => {
      const message = sample(bobRoss);

      fireAlert({ type, message })
    }

    return {
      onClick,
    };
  },
});
</script>
