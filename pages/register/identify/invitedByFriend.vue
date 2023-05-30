<script setup lang="ts">
const name = ref('')
const invitedBy = ref({ id: '', name: '' })
</script>

<template>
  <div class="container flex grow flex-col pb-20 pt-8">
    <h3 class="mb-5 font-medium text-[#334155]">請輸入您的資訊</h3>

    <div class="mb-auto flex flex-col gap-4">
      <div>
        <small class="mb-1 block text-sm text-[#8999AE]">您的真實姓名</small>
        <InputText v-model="name" />
      </div>
      <div>
        <small class="mb-1 block text-sm text-[#8999AE]">您是誰的朋友</small>
        <InputSelect
          v-model="invitedBy"
          :list="[
            { id: '1', name: 'Link' },
            { id: '2', name: 'Hank' },
            { id: '3', name: 'Josh' },
            { id: '4', name: 'Ben' },
          ]"
        />
      </div>
    </div>

    <div class="my-6">
      <StepDots :length="3" :at="2" />
    </div>

    <div class="relative">
      <BtnPrimary :disabled="name.length === 0 || !invitedBy.id"
        >提交申請</BtnPrimary
      >
      <NuxtLink
        to="/register/identify"
        class="absolute left-0 right-0 top-full mx-auto mt-4 w-fit text-sm font-medium text-[#8a8c90]"
        >回到上一步</NuxtLink
      >
    </div>
  </div>
</template>
