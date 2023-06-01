<script setup lang="ts">
import { useUserStore, useSiteStore } from '~/stores'
import { User } from '@prisma/client'
import ModalRegisterPendingAlert from '~/components/Modal/RegisterPendingAlert.vue'

const userStore = useUserStore()
const siteStore = useSiteStore()

const { data: lineGroupMember } = await useFetch<User[]>(
  '/api/user/lineGroupMember'
)

const realName = ref('')
const invitedBy = ref({ id: '', name: '' })

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
      invitedBy: invitedBy.value.id,
    },
  })

  userStore.id = user.id
  userStore.info = user

  siteStore.loading = false

  modalRegisterPendingAlertIsOpened.value = true
}
</script>

<template>
  <div v-if="lineGroupMember" class="container flex grow flex-col pb-20 pt-8">
    <h3 class="mb-5 font-medium text-[#334155]">請輸入您的資訊</h3>

    <div class="mb-auto flex flex-col gap-4">
      <div>
        <small class="mb-1 block text-sm text-[#8999AE]">您的真實姓名</small>
        <InputText v-model="realName" />
      </div>
      <div>
        <small class="mb-1 block text-sm text-[#8999AE]">您是誰的朋友</small>
        <InputSelect
          v-model="invitedBy"
          :list="
            lineGroupMember.map((user) => ({ id: user.id, name: user.name }))
          "
        />
      </div>
    </div>

    <div class="my-6">
      <StepDots :length="3" :at="2" />
    </div>

    <div class="relative">
      <BtnPrimary
        @click="submit"
        :disabled="realName.length === 0 || !invitedBy.id"
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
