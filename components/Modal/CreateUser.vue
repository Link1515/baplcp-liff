<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import { User } from '@prisma/client'
import { useUserStore } from '~/stores'

const userStore = useUserStore()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const userRealName = ref('')
const loading = ref(false)

const submit = async () => {
  // TODO realName validation error message
  if (!userRealName.value) return

  loading.value = true

  const user = await $fetch<User>(`/api/user`, {
    method: 'POST',
    body: {
      lineId: userStore.lineId,
      realName: userRealName.value,
      name: userStore.name,
      avatar: userStore.avatar,
    },
  })

  userStore.id = user.id
  userStore.isAdmin = user.isAdmin

  userRealName.value = ''

  emit('close')

  await navigateTo('/')
}
</script>

<template>
  <VueFinalModal
    class="flex items-center justify-center"
    content-class="flex flex-col w-screen mx-4 p-4 bg-white border rounded-lg space-y-2"
    overlay-transition="vfm-fade"
    :click-to-close="false"
  >
    <div v-if="loading" class="mx-auto">
      <img src="/images/loading.svg" alt="loading" />
    </div>
    <div v-else class="flex flex-col items-center">
      <h2 class="mb-4 text-center text-xl">建立新用戶</h2>
      <p>請輸入您的真實姓名，並附註介紹您的人</p>
      <p>ex: 意倫(佳穎友)</p>
      <input type="text" v-model="userRealName" />
      <small class="text-neutral-500">* 此資料僅用於管理員識別身份</small>
      <button @click="submit" :disabled="loading" class="mt-4">送出</button>
    </div>
  </VueFinalModal>
</template>
