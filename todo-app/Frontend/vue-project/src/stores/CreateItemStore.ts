import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { todoUser } from '@/types/todoUser';
import api from '../api/axios.ts';

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
  const createItemApi = async (todo: todoUser) => {
    try {
      const response = await api.post('/createTodo', todo);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return { createItemApi };
});
