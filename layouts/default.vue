<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal'
import { useSiteStore } from '~/stores'

useLineLogin()

const siteStore = useSiteStore()

watch(
  () => siteStore.loading,
  () => {
    siteStore.loading
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = '')
  }
)
</script>

<template>
  <div>
    <div
      v-show="siteStore.loading"
      class="grid h-screen w-screen place-items-center"
    >
      <img src="/images/loading.svg" alt="loading" />
    </div>
    <div v-show="!siteStore.loading">
      <slot />
    </div>

    <ModalsContainer />
  </div>
</template>
