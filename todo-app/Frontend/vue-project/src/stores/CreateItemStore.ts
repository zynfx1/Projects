import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { todoUser } from '@/types/todoUser';
import api from '../api/axios.ts';
import TodoView from '@/views/TodoView.vue';

export const useModalStore = defineStore('createItemModal', () => {
  const isModalVisible = ref(false);

  function openModal() {
    isModalVisible.value = true;
  }

  function closeModal() {
    isModalVisible.value = false;
  }

  return { isModalVisible, openModal, closeModal };
});

export const createItem = defineStore('createItemFunc', () => {
  const todoList = ref<todoUser[]>([]);
  const notCompleteTodos = ref<todoUser[]>([]);
  const completeTodos = ref<todoUser[]>([]);
  const isLoading = ref<boolean>(false);

  const createItemApi = async (todo: todoUser) => {
    try {
      const response = await api.post('/createTodo', todo);
      notCompleteTodos.value = response.data.currentTodos;
      console.log(response.data.currentTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllTodos = async () => {
    try {
      const response = await api.get('/select-todos');
      notCompleteTodos.value = response.data.res;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodos = async (id: number) => {
    try {
      const response = await api.delete(`/delete-todo/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const isTodosComplete = async (todo: todoUser) => {
    try {
      const response = await api.put('/update-todo', todo);
      notCompleteTodos.value = response.data.res;
    } catch (error) {
      console.log(error);
    }
  };

  const selectNotCompleteTodos = async (): Promise<void> => {
    try {
      isLoading.value = true;
      const response = await api.get('/select-not-complete-todos');
      notCompleteTodos.value = response.data.res;
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  const selectCompleteTodos = async (): Promise<void> => {
    try {
      isLoading.value = true;
      const response = await api.get('/select-complete-todos');
      completeTodos.value = response.data.res;
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    createItemApi,
    todoList,
    fetchAllTodos,
    deleteTodos,
    isTodosComplete,
    selectNotCompleteTodos,
    selectCompleteTodos,
    isLoading,
    notCompleteTodos,
    completeTodos,
  };
});

export const completedStore = defineStore('completedStore', () => {
  const isTodosCompleted = ref(false);

  const todosIsComplete = () => {
    isTodosCompleted.value = !isTodosCompleted.value;
  };

  const todosIsNotComplete = () => {};

  return { isTodosCompleted, todosIsComplete, todosIsNotComplete };
});
