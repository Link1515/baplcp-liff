<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'comfirm'): void
}>()

const loading = ref(false)
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
      <p class="mb-4">
        <slot />
      </p>
      <div class="flex gap-4">
        <button @click="emit('comfirm')" class="bg-green-500">確認</button>
        <button @click="emit('close')" class="bg-neutral-400">取消</button>
      </div>
    </div>
  </VueFinalModal>
</template>
