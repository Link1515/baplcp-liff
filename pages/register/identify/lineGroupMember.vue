<script setup lang="ts">
const name = ref('')
</script>

<template>
  <div class="container flex grow flex-col pb-20 pt-8">
    <h3 class="mb-4 font-medium">請輸入您的真實姓名</h3>

    <div class="mb-auto">
      <InputText v-model="name" />
    </div>

    <div class="mb-6">
      <StepDots :length="3" :at="2" />
    </div>

    <div class="relative">
      <BtnPrimary :disabled="name.length === 0">提交申請</BtnPrimary>
      <NuxtLink
        to="/register/identify"
        class="absolute left-0 right-0 top-full mx-auto mt-4 w-fit text-sm font-medium text-[#8a8c90]"
        >回到上一步</NuxtLink
      >
    </div>
  </div>
</template>
