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

  const createItemApi = async (todo: todoUser) => {
    try {
      const response = await api.post('/createTodo', todo);
      todoList.value = response.data.currentTodos;
      console.log(response.data.currentTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllTodos = async () => {
    try {
      const response = await api.get('/select-todos');
      todoList.value = response.data.res;
    } catch (error) {
      console.log(error);
    }
  };

  return { createItemApi, todoList, fetchAllTodos };
});
