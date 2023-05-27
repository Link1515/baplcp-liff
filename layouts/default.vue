<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal'
import { useSiteStore } from '~/stores'

useLineLogin()

const siteStore = useSiteStore()
const route = useRoute()
console.log(route)

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
      <div class="h-8 bg-blue-950 px-3 pt-3">
        <NuxtLink v-show="!route.path.includes('register')" to="/">
          <img
            src="/images/icons/home.svg"
            class="inline-block h-full"
            alt="home"
          />
        </NuxtLink>
      </div>
      <slot />
    </div>

    <ModalsContainer />
  </div>
</template>
