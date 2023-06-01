<script setup lang="ts">
import { User } from '@prisma/client'
import { useSiteStore, useUserStore } from '~/stores'
import ModalRegisterPendingAlert from '~/components/Modal/RegisterPendingAlert.vue'

const siteStore = useSiteStore()
const userStore = useUserStore()

const realName = ref('')

const modalRegisterPendingAlertIsOpened = ref(false)

const submit = async () => {
  siteStore.loading = true

  const user = await $fetch<User>(`/api/user`, {
    method: 'POST',
    body: {
      lineId: userStore.lineId,
      realName: realName.value,
      name: userStore.name,
      avatar: userStore.avatar,
      isLineGroupMember: true,
    },
  })

  userStore.id = user.id
  userStore.info = user

  siteStore.loading = false

  modalRegisterPendingAlertIsOpened.value = true
}
</script>

<template>
  <div class="container flex grow flex-col pb-20 pt-8">
    <h3 class="mb-4 font-medium">請輸入您的真實姓名</h3>

    <div class="mb-auto">
      <InputText v-model="realName" />
    </div>

    <div class="my-6">
      <StepDots :length="3" :at="2" />
    </div>

    <div class="relative">
      <BtnPrimary @click="submit" :disabled="realName.length === 0"
        >提交申請</BtnPrimary
      >
      <NuxtLink
        to="/register/identify"
        class="absolute left-0 right-0 top-full mx-auto mt-4 w-fit text-sm font-medium text-[#8a8c90]"
        >回到上一步</NuxtLink
      >
    </div>

    <ModalRegisterPendingAlert v-model="modalRegisterPendingAlertIsOpened" />
  </div>
</template>
