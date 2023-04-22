<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import { useUserStore } from '~/stores'

const userStore = useUserStore()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const userRealName = ref('')
const loading = ref(false)

const submit = async () => {
  if (!userRealName.value) return

  loading.value = true

  await $fetch(`/api/user/create`, {
    method: 'post',
    body: {
      lineId: userStore.lineId,
      realName: userRealName.value,
    },
  })

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
      <input type="text" v-model="userRealName" class="mb-4" />
      <button @click="submit" :disabled="loading">送出</button>
    </div>
  </VueFinalModal>
</template>
