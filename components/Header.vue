<script setup lang="ts">
defineProps<{
  title: string
  subTitle?: string
  titleLarger?: boolean
}>()
</script>

<template>
  <header
    class="relative flex min-h-[168px] flex-col items-center justify-center gap-2 p-2 text-white"
  >
    <div class="absolute left-0 top-0 -z-10 h-full w-full">
      <img
        src="/images/background/header.png"
        class="h-full w-full object-cover object-center"
        alt="header-bg"
      />
    </div>
    <h1 class="font-bold" :class="`${titleLarger ? 'text-5xl' : 'text-3xl'}`">
      {{ title }}
    </h1>
    <h2 v-show="subTitle">{{ subTitle }}</h2>
  </header>
</template>
