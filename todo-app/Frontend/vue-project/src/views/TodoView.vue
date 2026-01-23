<script setup lang="ts"></script>
<template>
  <section class="w-max-screen font-poppins flex min-h-screen flex-col items-center bg-white/90">
    <div class="flex h-30 w-full items-center justify-center text-xl">
      <ul>
        <li class="flex items-center justify-center gap-1 text-center">
          <a
            class="hover:bg-jungle-green-900 h-full cursor-pointer rounded-sm bg-green-200 px-15 py-3 transition duration-300 ease-in-out hover:text-white"
            >Todo List</a
          >
          <a
            class="hover:bg-jungle-green-900 h-full cursor-pointer rounded-sm bg-green-200 px-15 py-3 transition duration-300 ease-in-out hover:text-white"
            >About</a
          >
          <a
            class="hover:bg-jungle-green-900 h-full rounded-sm bg-green-200 px-15 py-3 transition duration-300 ease-in-out hover:text-white"
            >Contact</a
          >
        </li>
      </ul>
    </div>
    <div
      class="text-jungle-green-900 flex flex-col rounded-2xl border border-gray-500/10 bg-white p-8 shadow-2xl shadow-gray-400/50 lg:h-3/4 lg:w-3/4 2xl:h-3/4 2xl:w-3/4"
    >
      <header class="text-3xl text-black">Tasks:</header>
      <div class="flex h-full w-full flex-col items-center justify-center">
        <ul class="">
          <li class="flex items-center gap-5">
            <label class="flex cursor-pointer items-center">
              <input type="checkbox" class="peer sr-only" />

              <div
                class="peer-checked:border-jungle-green-900 after:border-jungle-green-900 relative h-8 w-8 rounded-full border-2 border-black peer-checked:bg-white after:absolute after:top-1 after:left-2.5 after:hidden after:h-[14px] after:w-[8px] after:rotate-45 after:border-r-2 after:border-b-2 after:content-[''] peer-checked:after:block"
              ></div>
            </label>
            <p href="" class="text-black">item 1</p>
          </li>
        </ul>
      </div>
      <div class="h-3/8 w-full">
        <header class="text-xl text-black">Completed:</header>
      </div>
    </div>
  </section>
</template>
