<template>
  <header>
    <h1
      class="flex h-28 flex-col items-center justify-center bg-blue-950 text-center text-3xl text-white"
    >
      創建活動
    </h1>

    <div class="container flex flex-col gap-4 py-8 pb-20">
      <div>
        <h3 class="mb-1">活動名稱</h3>
        <input
          type="text"
          class="w-full rounded-md border border-gray-800 px-2 py-1 outline-none"
        />
      </div>
      <div>
        <h3 class="mb-1">季打費用</h3>
        <input
          type="text"
          class="w-full rounded-md border border-gray-800 px-2 py-1 outline-none"
        />
      </div>
      <div>
        <h3 class="mb-1">單次費用</h3>
        <input
          type="text"
          class="w-full rounded-md border border-gray-800 px-2 py-1 outline-none"
        />
      </div>

      <div>
        <h3>日期時間</h3>
        <div class="py-2 text-center">
          <button class="h-8 w-8 rounded-full bg-slate-300">+</button>
        </div>
      </div>
    </div>
  </header>
</template>
