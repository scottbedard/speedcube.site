<template>
  Hello world
  <BoxGeometry :dimensions="1">
    <template #up>
      <AxesHelper :size="0.5" />
    </template>
    <template #left>
      <AxesHelper :size="0.5" />
    </template>
    <template #front>
      <AxesHelper :size="0.5" />
    </template>
    <template #right>
      <AxesHelper :size="0.5" />
    </template>
    <template #back>
      <AxesHelper :size="0.5" />
    </template>
    <template #down>
      <AxesHelper :size="0.5" />
    </template>
  </BoxGeometry>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AxesHelper, BoxGeometry } from '@/three/components'

export default defineComponent({
  components: {
    AxesHelper,
    BoxGeometry,
  },
  name: 'CubeCore',
})
</script>