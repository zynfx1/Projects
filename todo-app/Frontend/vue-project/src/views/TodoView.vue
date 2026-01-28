<script setup lang="ts">
import { ref } from 'vue';
import { useModalStore, createItem } from '@/stores/CreateItemStore';
import type { todoUser } from '@/types/todoUser';

const modalStore = useModalStore();
const todos = createItem();
</script>
<template>
  <section class="w-max-screen font-poppins flex min-h-screen flex-col items-center bg-white/90">
    <div class="flex h-30 w-full items-center justify-center text-xl">
      <ul>
        <li class="flex items-center justify-center gap-0.5 text-center">
          <a
            class="hover:bg-jungle-green-900 bg-custom-green relative h-full cursor-pointer rounded-sm px-15 py-3 transition duration-300 ease-in-out hover:gap-0 hover:text-white"
            >Todo List</a
          >
          <a
            class="hover:bg-jungle-green-900 bg-custom-green h-full cursor-pointer rounded-sm px-15 py-3 transition duration-300 ease-in-out hover:text-white"
            >About</a
          >
          <a
            class="hover:bg-jungle-green-900 bg-custom-green h-full rounded-sm px-15 py-3 transition duration-300 ease-in-out hover:text-white"
            >Contact</a
          >
        </li>
      </ul>
    </div>
    <div
      class="text-jungle-green-900 flex flex-col rounded-2xl border border-gray-500/10 bg-white p-8 shadow-2xl shadow-gray-400/50 lg:h-3/4 lg:w-3/4 2xl:h-3/4 2xl:w-3/4"
    >
      <header class="my-2 text-3xl text-black">Tasks:</header>
      <div class="flex h-full w-full flex-col items-center justify-center gap-2">
        <div
          v-for="todo in todos.todoList"
          :key="todo"
          for="myCB"
          class="flex h-20 w-full items-center rounded-md border border-black/5 bg-gray-500/12 px-4 shadow-md drop-shadow-md drop-shadow-black/10 transition duration-200 ease-in-out hover:bg-gray-800/20"
        >
          <label class="flex h-full w-full items-center justify-center">
            <ul class="flex w-full items-center justify-between">
              <li class="flex items-center gap-5">
                <input type="checkbox" class="peer sr-only" id="myCB" />
                <div
                  class="peer-checked:border-jungle-green-900 relative h-6 w-6 rounded-full border-2 border-black after:invisible after:absolute after:right-1 after:bottom-1 after:left-1.75 after:h-3.5 after:w-1.5 after:rotate-45 after:border-r-2 after:border-b-2 peer-checked:after:visible"
                ></div>

                <p href="" class="text-black">{{ todo }}</p>
              </li>
              <li class="flex gap-3">
                <img
                  src="../assets/img/edit.png"
                  alt=""
                  class="h-7 w-7 rounded-sm p-0.5 transition duration-200 ease-in-out hover:scale-110 hover:bg-black/50"
                />
                <img
                  src="../assets/img/delete.png"
                  alt=""
                  class="h-7 w-7 rounded-sm p-0.5 transition duration-200 ease-in-out hover:scale-110"
                />
              </li>
            </ul>
          </label>
        </div>
      </div>
      <div class="my-2 h-3/8 w-full">
        <header class="text-xl font-medium text-black">Completed:</header>
      </div>
      <div class="my-2 flex h-full w-full items-center justify-end">
        <button @click="modalStore.openModal">
          <img
            src="../assets/img/plus(2).png"
            alt=""
            class="bg-jungle-green-900 mx-4 h-17 w-17 cursor-pointer rounded-full border border-gray-500/50 p-5.5 transition duration-200 ease-in-out hover:scale-105"
          />
        </button>
      </div>
    </div>
  </section>
</template>
