<template>
  <div class="gap-6 grid">
    <ContactInfo />
    <Privacy />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ContactInfo from '@/partials/account/ContactInfo.vue'
import Privacy from '@/partials/account/Privacy.vue'

export default defineComponent({
  components: {
    ContactInfo,
    Privacy,
  },
  name: 'Profile',
})
</script>
