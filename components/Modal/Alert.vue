<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <VueFinalModal
    class="flex items-center justify-center"
    content-class="flex flex-col w-screen mx-4 p-4 bg-white border rounded-lg space-y-2"
    overlay-transition="vfm-fade"
    :click-to-close="false"
  >
    <div class="flex flex-col items-center">
      <p class="mb-4">
        <slot />
      </p>
      <div class="text-center">
        <button @click="emit('close')" class="bg-green-500">確定</button>
      </div>
    </div>
  </VueFinalModal>
</template>
