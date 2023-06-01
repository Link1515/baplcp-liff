<script setup lang="ts">
import { useUserStore } from '~/stores'

const userStore = useUserStore()
const showPage = ref(false)

watchEffect(async () => {
  if (!userStore.info) return

  if (userStore.info.isChecked) {
    await navigateTo('/')
  }

  showPage.value = true
})
</script>

<template>
  <div v-show="showPage">
    <NuxtPage />
  </div>
</template>
