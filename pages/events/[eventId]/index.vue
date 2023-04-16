<template>
  <div>
    <header>
      <h1
        class="flex h-28 flex-col items-center justify-center bg-blue-950 text-center text-white"
      >
        <span class="text-3xl">華江高中</span>
        <small class="text-xl">112/01/01 ~ 112/03/31</small>
      </h1>
    </header>

    <div class="container py-8">
      <div class="flex flex-col gap-4 text-center">
        <NuxtLink
          to="/events/1233/1321"
          class="grid place-items-center bg-slate-300 py-2"
        >
          <h2>112/01/07 (日)</h2>
        </NuxtLink>
        <NuxtLink
          to="/events/1233/1231"
          class="grid place-items-center bg-slate-300 py-2"
        >
          <h2>112/01/10 (日)</h2>
        </NuxtLink>
        <NuxtLink
          to="/events/1233/seasonMember"
          class="grid place-items-center bg-slate-300 py-2"
        >
          <h2>季打</h2>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
