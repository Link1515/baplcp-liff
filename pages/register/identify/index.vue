<script setup lang="ts">
enum Identify {
  LineGroupMember = 'LINE_GROUP_MEMBER',
  InvitedByFriend = 'INVITED_BY_FRIEND',
}
const identify = ref<Identify>()

const goToNextStep = () => {
  switch (identify.value) {
    case Identify.LineGroupMember:
      return navigateTo('/register/identify/lineGroupMember')

    case Identify.InvitedByFriend:
      return navigateTo('/register/identify/invitedByFriend')
  }
}
</script>

<template>
  <div class="container flex grow flex-col pb-20 pt-8">
    <h3 class="mb-4 font-medium">請選擇你的身分</h3>

    <div class="mb-auto flex flex-col gap-3">
      <InputRadio
        v-model="identify"
        name="identify"
        :value="Identify.LineGroupMember"
        >BAPLCP 群內會員</InputRadio
      >
      <InputRadio
        v-model="identify"
        name="identify"
        :value="Identify.InvitedByFriend"
        >由朋友邀請</InputRadio
      >
    </div>

    <div class="mb-6">
      <StepDots :length="3" :at="1" />
    </div>

    <BtnPrimary @click="goToNextStep" :disabled="!identify">下一步</BtnPrimary>
  </div>
</template>
