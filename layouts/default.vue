<script setup lang="ts">
import { useUserStore } from '~/stores'

const nuxtApp = useNuxtApp()
const userStore = useUserStore()

onMounted(() => {
  if (!nuxtApp.$liff.isLoggedIn()) {
    nuxtApp.$liff.login()
  }

  const lineUserProfile = nuxtApp.$liff.getDecodedIDToken()
  if (!lineUserProfile) return

  userStore.lineId = lineUserProfile.sub || ''
  userStore.name = lineUserProfile.name || ''
  userStore.avatar = lineUserProfile.picture || ''
})
</script>

<template>
  <div>
    <slot />
    {{ userStore.lineId }}
    <hr />
    {{ userStore.name }}
    <img :src="userStore.avatar" alt="avatar" />
  </div>
</template>
