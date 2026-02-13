<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useModalStore, createItem, completedStore } from '@/stores/CreateItemStore';
import type { todoUser } from '@/types/todoUser';

const todos = createItem();
const todosComplete = completedStore();
const props = defineProps<{
  data: {
    id: number;
    title: string;
    isComplete: boolean;
  };
  //showCompleted: boolean;
}>();

const handleDelete = () => {
  todos.deleteTodos(props.data.id);
};

const emit = defineEmits<{
  (e: 'isTodoComplete', payload: todoUser): void;
}>();

const isTodoCheck = ref(false);
const toggleTodoCheckBox = () => {
  isTodoCheck.value = !isTodoCheck.value;
  //todos.selectNotCompleteTodos();
  const todo: todoUser = {
    id: props.data.id,
    title: props.data.title,
    isComplete: isTodoCheck.value,
  };
  emit('isTodoComplete', todo);
};

onMounted(async () => {
  await Promise.all([todos.selectNotCompleteTodos(), todos.selectCompleteTodos()]);
});
</script>

<template>
  <div
    class="[&::-webkit-scrollbar-track]:bg-jungle-green-800/50 [&::-discwebkit-scrollbar-thumb]:bg-jungle-green-900 max-h-100 w-full overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-2xl [&::-webkit-scrollbar-track]:rounded-2xl"
  >
    <div
      for="myCB"
      class="mb-2 flex h-20 w-full items-center rounded-md border border-black/5 bg-gray-500/12 px-4 shadow-md drop-shadow-md drop-shadow-black/10 transition duration-200 ease-in-out hover:bg-gray-800/20"
    >
      <label class="flex h-full w-full items-center justify-center">
        <ul class="flex w-full items-center justify-between">
          <li class="flex items-center gap-5">
            <div class="" v-if="todos.completeTodosList">
              <input @click="toggleTodoCheckBox" type="checkbox" class="peer sr-only" id="myCB" />
              <div
                class="peer-checked:border-jungle-green-900 relative h-6 w-6 rounded-full border-2 border-black peer-checked:line-through after:invisible after:absolute after:right-1 after:bottom-1 after:left-1.75 after:h-3.5 after:w-1.5 after:rotate-45 after:border-r-2 after:border-b-2 peer-checked:after:visible"
              >
                <div class=""></div>
                <p href="" class="ml-8 w-70 truncate overflow-hidden text-black">
                  {{ props.data.title }}
                </p>
              </div>
            </div>

            <div class="" v-if="todos.notCompleteTodosList">
              <input @click="toggleTodoCheckBox" type="checkbox" class="peer sr-only" id="myCB" />
              <div
                class="peer-checked:border-jungle-green-900 relative h-6 w-6 rounded-full border-2 border-black peer-checked:line-through after:invisible after:absolute after:right-1 after:bottom-1 after:left-1.75 after:h-3.5 after:w-1.5 after:rotate-45 after:border-r-2 after:border-b-2 peer-checked:after:visible"
              >
                <div class=""></div>
                <p href="" class="ml-8 w-70 truncate overflow-hidden text-black">
                  {{ props.data.isComplete }}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </label>
      <li class="flex gap-3">
        <img
          src="../assets/img/edit.png"
          alt=""
          class="h-7 w-7 rounded-sm p-0.5 transition duration-200 ease-in-out hover:scale-110 hover:bg-black/50"
        />
        <img
          v-if="isTodoCheck === false"
          @click="handleDelete()"
          src="../assets/img/delete.png"
          alt=""
          class="h-7 w-7 rounded-sm p-0.5 transition duration-200 ease-in-out hover:scale-110"
        />
      </li>
    </div>
  </div>
</template>
