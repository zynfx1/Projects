<script setup lang="ts">
import { ref } from 'vue';
import type { todoUser } from '../types/todoUser.ts';
import { useUpdateModalStore } from '@/stores/CreateItemStore.ts';
const updateModalStore = useUpdateModalStore();
const updateTitle = ref();
const updateComment = ref();

defineProps<{
  showModal: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'updateCurrentItemTodos', todo: todoUser): void;
}>();

const updateCurrentTodos = () => {
  if (updateTitle.value === '') {
    return;
  }

  const todo: todoUser = {
    id: updateModalStore.selectedTodo?.id || 0,
    title: updateTitle.value,
    comment: updateComment.value || 'No comment',
    isComplete: updateModalStore.selectedTodo?.isComplete || false,
  };
  updateTitle.value = '';
  updateComment.value = '';
  emit('updateCurrentItemTodos', todo);
};
</script>
<template>
  <Teleport to="body">
    <Transition
      name="fade"
      enter-active-class="duration-500 ease-out"
      enter-from-class="opacity-0 "
      leave-active-class="duration-300 ease-out"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showModal"
        class="fixed inset-0 flex items-center justify-center bg-black/60"
        @click.self="$emit('close')"
      >
        <div
          class="font-poppins fixed flex flex-col items-center justify-center rounded-md border border-black/60 bg-white lg:inset-x-3/9 xl:inset-x-3/8 2xl:inset-x-3/8"
        >
          <div class="m-5 flex h-full w-full flex-col items-center justify-center">
            <div class="flex h-full w-full items-center justify-between">
              <header class="mx-4 w-full text-left text-4xl">Task Details</header>
              <img
                src="../assets/img/close.png"
                alt=""
                class="relative right-1 bottom-6 h-5 w-5 transition duration-200 ease-in-out hover:scale-110"
                @click="$emit('close')"
              />
            </div>
            <form class="flex h-full w-full flex-col justify-center gap-4 px-8">
              <div class="flex flex-col">
                <label for="">Title</label>
                <input
                  v-model="updateTitle"
                  type="text"
                  class="rounded-sm border border-black/30 px-1"
                  maxlength="40"
                  :placeholder="updateModalStore.selectedTodo?.title"
                />
              </div>
              <div class="flex flex-col">
                <label for="">Deadline</label>
                <input type="date" class="rounded-sm border border-black/30 px-1" required />
              </div>
              <div class="flex h-35 flex-col">
                <label for="">Comment</label>
                <textarea
                  v-model="updateComment"
                  class="flex h-full resize-none items-start rounded-sm border border-black/30 p-1"
                  :placeholder="updateModalStore.selectedTodo?.comment"
                  required
                ></textarea>
              </div>
            </form>
          </div>
          <div class="mb-5 flex w-full justify-between gap-2 px-15">
            <button
              @click="$emit('close')"
              class="border-jungle-green-800 text-jungle-green-800 h-13 w-30 cursor-pointer rounded-md border-2 transition duration-200 ease-in-out hover:bg-gray-500/10"
            >
              Close
            </button>
            <button
              @click="(updateCurrentTodos(), useUpdateModalStore().closeUpdateModal())"
              class="bg-jungle-green-800 hover:bg-jungle-green-900 border-jungle-green-800 h-13 w-30 cursor-pointer rounded-md border-2 text-white transition duration-200 ease-in-out"
            >
              Update Task
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
