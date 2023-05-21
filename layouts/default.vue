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
      <div class="bg-blue-950">
        <NuxtLink to="/" class="ml-3 mt-3 inline-block w-5">
          <img src="/images/icons/home.svg" alt="home" />
        </NuxtLink>
      </div>
      <slot />
    </div>

    <ModalsContainer />
  </div>
</template>
