<template>
  <div>
    <header>
      <h1
        class="flex h-28 items-center justify-center bg-blue-950 text-center text-3xl text-white"
      >
        活動清單
      </h1>
    </header>

    <div class="container">
      <div class="flex flex-col gap-4 py-8 text-center">
        <NuxtLink
          to="/admin/events/1233"
          class="grid place-items-center bg-slate-300 py-2"
        >
          <h2>華江高中</h2>
          <small>112/01/01 ~ 112/03/31</small>
        </NuxtLink>
        <NuxtLink
          to="/admin/events/2332"
          class="grid place-items-center bg-slate-300 py-2"
        >
          <h2>育成高中</h2>
          <small>112/01/01 ~ 112/03/31</small>
        </NuxtLink>

        <NuxtLink
          to="/admin/events/createEvent"
          class="grid place-items-center bg-slate-300 py-2"
          >+</NuxtLink
        >
      </div>
    </div>
  </div>
</template>
