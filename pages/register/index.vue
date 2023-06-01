<script setup lang="ts">
import { useSiteStore, useUserStore } from '~/stores'
import ModalRegisterPendingAlert from '~/components/Modal/RegisterPendingAlert.vue'

const siteStore = useSiteStore()
const userStore = useUserStore()

const modalRegisterPendingAlertIsOpened = computed(() =>
  userStore.info ? !userStore.info.isChecked : false
)
const loadBg = ref(false)

onMounted(() => {
  loadBg.value = true
})

const showPage = () => {
  siteStore.loading = false
}
</script>

<template>
  <div class="relative flex min-h-screen flex-col pb-20 pt-12">
    <div v-if="loadBg" class="absolute left-0 top-0 -z-10 h-full w-full">
      <img
        @load="showPage"
        src="/images/background/full.png"
        class="h-full w-full object-cover object-center"
        alt="bg"
      />
    </div>
    <div class="container flex grow flex-col">
      <div class="mb-auto flex">
        <img src="/images/logo.svg" class="mr-auto" alt="logo" />
        <button>
          <img src="/images/icons/dots.svg" alt="dots" />
        </button>
      </div>

      <div class="mb-12 text-center text-white">
        <h1 class="mb-2 text-3xl font-bold tracking-widest">歡迎加入</h1>
        <p class="text-lg">申請會員以加入 BAPLCP 報名系統</p>
      </div>

      <div class="my-6">
        <StepDots :length="3" :at="0" />
      </div>

      <NuxtLink to="/register/identify">
        <BtnPrimary>會員申請</BtnPrimary>
      </NuxtLink>
    </div>

    <ModalRegisterPendingAlert v-model="modalRegisterPendingAlertIsOpened" />
  </div>
</template>
