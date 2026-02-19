<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {
  useCreateModalStore,
  createItem,
  completedStore,
  useUpdateModalStore,
} from '@/stores/CreateItemStore';
import type { todoUser } from '@/types/todoUser';
const updateModalStore = useUpdateModalStore();
const todos = createItem();
const todosComplete = completedStore();

const props = defineProps<{
  data: {
    id: number;
    title: string;
    isComplete: boolean;
    comment?: string;
  };
}>();
const emit = defineEmits<{
  (e: 'isTodoComplete', payload: todoUser): void;
  (e: 'updateTodo', payload: todoUser): void;
}>();

const isTodoCheck = ref(props.data.isComplete);

const toggleTodoCheckBox = async () => {
  isTodoCheck.value = !isTodoCheck.value;
  const todo: todoUser = {
    id: props.data.id,
    title: props.data.title,
    isComplete: isTodoCheck.value,
    comment: props.data.comment || '',
  };

  emit('isTodoComplete', todo);
};

const handleUpdate = () => {
  updateModalStore.openUpdateModal();

  const todo: todoUser = {
    id: props.data.id,
    title: props.data.title,
    isComplete: props.data.isComplete,
    comment: props.data.comment || '',
  };
  updateModalStore.selectedTodo = todo;
};

const handleDelete = () => {
  todos.deleteTodos(props.data.id);
};

/*onMounted(async () => {
  await Promise.all([todos.selectNotCompleteTodos(), todos.selectCompleteTodos()]);
});*/
</script>

<template>
  <div
    for="myCB"
    class="mb-2 flex h-20 w-full items-center rounded-md border border-black/5 bg-gray-500/12 px-4 shadow-md drop-shadow-md drop-shadow-black/10 transition duration-200 ease-in-out hover:bg-gray-800/20"
  >
    <label class="flex h-full w-full items-center justify-center">
      <ul class="flex w-full items-center justify-between">
        <li class="flex items-center gap-5">
          <div class="">
            <input @click="toggleTodoCheckBox()" type="checkbox" class="peer sr-only" id="myCB" />
            <div
              v-if="!isTodoCheck"
              class="peer-checked:border-jungle-green-900 relative h-6 w-6 rounded-full border-2 border-black peer-checked:line-through after:invisible after:absolute after:right-1 after:bottom-1 after:left-1.75 after:h-3.5 after:w-1.5 after:rotate-45 after:border-r-2 after:border-b-2 peer-checked:after:visible"
            >
              <p href="" class="ml-8 w-70 truncate overflow-hidden text-black">
                {{ props.data.title }}
              </p>
            </div>
            <div
              v-if="isTodoCheck"
              class="border-jungle-green-900 relative h-6 w-6 rounded-full border-2 line-through after:absolute after:right-1 after:bottom-1 after:left-1.75 after:h-3.5 after:w-1.5 after:rotate-45 after:border-r-2 after:border-b-2 peer-checked:after:visible"
            >
              <p href="" class="ml-8 w-70 truncate overflow-hidden text-black">
                {{ props.data.title }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </label>
    <li class="flex gap-3">
      <img
        v-if="!isTodoCheck"
        @click="handleUpdate()"
        src="../assets/img/edit.png"
        alt=""
        class="h-7 w-7 rounded-sm p-0.5 transition duration-200 ease-in-out hover:scale-110 hover:bg-black/50"
      />
      <img
        v-if="!isTodoCheck"
        @click="handleDelete()"
        src="../assets/img/delete.png"
        alt=""
        class="h-7 w-7 rounded-sm p-0.5 transition duration-200 ease-in-out hover:scale-110"
      />
    </li>
  </div>
</template>
