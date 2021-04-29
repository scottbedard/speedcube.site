<template>
  <h1 class="tw-page-title">Welcome back</h1>

  <div
    v-if="errorMessage"
    v-text="errorMessage"
    class="mb-6 text-center text-red-500" />

  <Card class="mb-6 mx-auto max-w-lg" padded>
    <form class="grid gap-6" @submit.prevent="submit">
      <Input
        v-model="data.username"
        autofocus
        label="Username"
        required
        :disabled="loading" />

      <Input
        v-model="data.password"
        label="Password"
        type="password"
        required
        :disabled="loading" />

      <div class="flex flex-wrap items-center gap-6 justify-between">
        <Checkbox v-model="data.remember" :disabled="loading">
          Remember me
        </Checkbox>

        <Button
          class="w-full xs:w-auto"
          primary
          type="submit"
          :disabled="loading"
          :loading="loading">
          Login
        </Button>
      </div>
    </form>
  </Card>

  <p class="flex flex-wrap justify-center gap-x-8 text-center">
    <RouterLink :to="{ name: 'forgot-password' }">Forgot password? Click here to reset it.</RouterLink>
  </p>
</template>

<script lang="ts">
import { Button, Card, Checkbox, Input } from '@/components'
import { computed, defineComponent } from 'vue'
import { isString } from 'lodash-es'
import { useLogin } from '@/app/api'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const { data, failed, loading, login, unauthorized } = useLogin()
    const route = useRoute()
    const router = useRouter()

    const errorMessage = computed(() => {
      if (unauthorized.value) {
        return 'Invalid username / password combination.'
      }

      if (failed.value) {
        return 'An unknown error occured.'
      }
    })

    const submit = () => {
      login().then(() => {
        if (isString(route.query.returnTo)) {
          router.replace(route.query.returnTo)
        } else {
          router.replace({ name: 'home' })
        }
      })
    }

    return {
      data,
      errorMessage,
      loading,
      submit,
    }
  },
  components: {
    Button,
    Card,
    Checkbox,
    Input,
  },
  name: 'Login',
})
</script>