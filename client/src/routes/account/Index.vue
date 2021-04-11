<template>
  <div class="gap-6 grid grid-cols-12">
    <div class="col-span-3">
      <Card>
        <CardLink
          icon="user"
          text="Profile"
          :to="{ name: 'account:profile' }" />
        
        <CardLink
          icon="lock"
          text="Security"
          :to="{ name: 'account:security' }" />

        <CardLink
          icon="bell"
          text="Notifications"
          :to="{ name: 'account:notifications' }" />
      </Card>
    </div>

    <div class="col-span-9">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Card, CardLink } from '@/components'

export default defineComponent({
  components: {
    Card,
    CardLink,
  },
  name: 'AccountIndex',
})
</script>