<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal'
import { useSiteStore } from '~/stores'

useLineLogin()

const siteStore = useSiteStore()
const route = useRoute()

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
      <NuxtLink
        v-show="!route.path.includes('register')"
        to="/"
        class="fixed left-3 top-3 h-5"
      >
        <img
          src="/images/icons/home.svg"
          class="inline-block h-full"
          alt="home"
        />
      </NuxtLink>
      <slot />
    </div>

    <ModalsContainer />
  </div>
</template>
