<template>
  <div>
    <Header title="會員註冊" />

    <div class="container py-8">
      <h2 class="mb-4 text-xl">請選擇您的註冊身份</h2>

      <div class="flex flex-col gap-4 text-center">
        <NuxtLink to="/" class="primaryBtn">群內會員</NuxtLink>
        <NuxtLink to="/" class="primaryBtn">群外會員</NuxtLink>
      </div>
    </div>
  </div>
</template>
