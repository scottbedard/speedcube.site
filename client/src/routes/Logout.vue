<template>
  <h1 class="tw-page-title">Logging out...</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useLogout } from '@/app/api'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const { logout } = useLogout()
    const router = useRouter()

    logout().then(() => {
      router.replace({ name: 'home' })
    })
  },
})
</script>
