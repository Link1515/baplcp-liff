<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
</script>

<template>
  <VueFinalModal
    class="flex items-center justify-center"
    content-class="flex flex-col w-screen mx-6 p-6 bg-white rounded-xl"
    overlay-class="!bg-[#264573] !bg-opacity-50"
    overlay-transition="vfm-fade"
    :click-to-close="false"
    displayDirective="show"
  >
    <div class="flex flex-col">
      <div class="mb-6 w-10">
        <img src="/images/icons/info.svg" alt="info" />
      </div>
      <h3 class="mb-2 text-xl font-semibold">審核中</h3>
      <small class="mb-6 text-sm text-[#64748B]"
        >您的申請正在審核中，請勿重複申請並耐心等候通知，謝謝！</small
      >
      <BtnPrimary>離開網頁</BtnPrimary>
    </div>
  </VueFinalModal>
</template>
