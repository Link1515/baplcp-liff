<script setup lang="ts">
useHead({
  link: [
    {
      rel: 'preload',
      href: '/images/background/full.png',
      as: 'image',
    },
  ],
})
</script>

<template>
  <div
    class="h-screen bg-[url('/images/background/full.png')] bg-cover bg-center pb-20 pt-12"
  >
    <div class="container flex h-full flex-col">
      <div class="mb-auto flex">
        <img src="/images/logo.svg" class="mr-auto" alt="logo" />
        <button class="bg-transparent p-0">
          <img src="/images/icons/dots.svg" alt="dots" />
        </button>
      </div>

      <div class="mb-12 text-center text-white">
        <h1 class="mb-2 text-3xl font-bold tracking-widest">歡迎加入</h1>
        <p class="text-lg">申請會員以加入 BAPLCP 報名系統</p>
      </div>

      <div class="mb-6">
        <StepDots :length="3" :at="0" />
      </div>

      <div>
        <button class="btn-primary">會員申請</button>
      </div>
    </div>
  </div>
</template>
