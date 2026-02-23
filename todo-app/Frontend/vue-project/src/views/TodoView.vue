<script setup lang="ts">
import { onMounted } from 'vue';
import { useAboutModalStore, useContactModalStore, activeTab } from '@/stores/headerModalStore';
import { useCreateModalStore, createItem} from '@/stores/CreateItemStore';
import todosCard from '@/components/todosCard.vue';
const contactModalStore = useContactModalStore();
const aboutModalStore = useAboutModalStore();
const modalStore = useCreateModalStore();
const todos = createItem();

onMounted(async () => {
  //todos.selectNotCompleteTodos();
  //todos.selectCompleteTodos();
  await Promise.all([todos.selectNotCompleteTodos(), todos.selectCompleteTodos()]);
});
</script>
<template>
  <section class="w-max-screen font-poppins flex min-h-screen flex-col items-center bg-white/90">
    <div class="flex h-30 w-full items-center justify-center text-xl">
      <ul>
        <li class="flex items-center justify-center gap-0.5 text-center">
          <a
            @click="
              (aboutModalStore.closeAboutModal('todo-list'),
              contactModalStore.closeContactModal('todo-list'))
            "
            :class="{ 'bg-jungle-green-900 text-white': activeTab === 'todo-list' }"
            class="bg-custom-green hover:bg-jungle-green-900 relative h-full cursor-pointer rounded-sm px-15 py-3 transition duration-300 ease-in-out hover:gap-0 hover:text-white"
            >Todo List</a
          >
          <a
            @click="aboutModalStore.openAboutModal('about')"
            :class="{ 'bg-jungle-green-900 text-white': activeTab === 'about' }"
            class="hover:bg-jungle-green-900 bg-custom-green h-full cursor-pointer rounded-sm px-15 py-3 transition duration-300 ease-in-out hover:text-white"
            >About</a
          >
          <a
            @click="contactModalStore.openContactModal('contact')"
            :class="{ 'bg-jungle-green-900 text-white': activeTab === 'contact' }"
            class="hover:bg-jungle-green-900 bg-custom-green h-full rounded-sm px-15 py-3 transition duration-300 ease-in-out hover:text-white"
            >Contact</a
          >
        </li>
      </ul>
    </div>
    <div class="fixed inset-50 flex items-center justify-center text-xl" v-if="todos.isLoading">
      loading...
    </div>
    <div
      class="text-jungle-green-900 flex flex-col rounded-2xl border border-gray-500/10 bg-white p-8 shadow-2xl shadow-gray-400/50 lg:min-h-50 lg:w-3/4 2xl:min-h-150 2xl:w-3/4"
    >
      <header class="my-2 text-3xl text-black">Tasks:</header>
      <div v-if="todos.notCompleteTodosList.length > 0" class="">
        <div
          class="[&::-webkit-scrollbar-track]:bg-jungle-green-800/50 [&::-webkit-scrollbar-thumb]:bg-jungle-green-900 max-h-100 w-full overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-2xl [&::-webkit-scrollbar-track]:rounded-2xl"
        >
          <todosCard
            v-for="todo in todos.notCompleteTodosList"
            :key="todo.id"
            :data="todo"
            @isTodoComplete="todos.isTodosComplete"
          ></todosCard>
        </div>
      </div>
      <div class="my-2 h-3/8 w-full">
        <header class="text-xl font-medium text-black">Completed:</header>
        <div v-if="todos.completeTodosList.length > 0" class="">
          <div
            class="[&::-webkit-scrollbar-track]:bg-jungle-green-800/50 [&::-webkit-scrollbar-thumb]:bg-jungle-green-900 max-h-100 w-full overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-2xl [&::-webkit-scrollbar-track]:rounded-2xl"
          >
            <todosCard
              v-for="todo in todos.completeTodosList"
              :key="todo.id"
              :data="todo"
              @isTodoComplete="todos.isTodosComplete"
            >
              ></todosCard
            >
          </div>
        </div>
      </div>
      <div class="fixed flex items-center justify-end 2xl:top-210 2xl:right-10">
        <button @click="modalStore.openModal">
          <img
            src="../assets/img/plus(2).png"
            alt=""
            class="bg-jungle-green-900 mx-4 h-20 w-20 cursor-pointer rounded-full border border-gray-500/50 p-6 transition duration-200 ease-in-out hover:scale-105"
          />
        </button>
      </div>
    </div>
  </section>
</template>
