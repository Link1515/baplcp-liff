<script setup lang="ts">
enum Identify {
  LineGroupMember = 'LINE_GROUP_MEMBER',
  InvitedByFriend = 'INVITED_BY_FRIEND',
}
const identify = ref<Identify>()
</script>

<template>
  <div class="flex h-screen flex-col">
    <Header title="會員申請" sub-title="申請以登入 BAPLCP 報名系統" />

    <div class="container flex grow flex-col pb-20 pt-8">
      <h3 class="mb-4">請選擇你的身分</h3>

      <div class="mb-auto flex flex-col gap-3">
        <Radio
          v-model="identify"
          name="identify"
          :value="Identify.LineGroupMember"
          >BAPLCP 群內會員</Radio
        >
        <Radio
          v-model="identify"
          name="identify"
          :value="Identify.InvitedByFriend"
          >由朋友邀請</Radio
        >
      </div>

      <div class="mb-6">
        <StepDots :length="3" :at="1" />
      </div>

      <NuxtLink to="">
        <BtnPrimary :disabled="!identify">下一步</BtnPrimary>
      </NuxtLink>
    </div>
  </div>
</template>
