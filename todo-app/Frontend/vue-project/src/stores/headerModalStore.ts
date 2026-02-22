import { defineStore } from 'pinia';
import { ref } from 'vue';
export const activeTab = ref('todo-list');
const isAboutModalVisible = ref(false);
const isContactModalVisible = ref(false);

export const useAboutModalStore = defineStore('aboutModal', () => {
  const openAboutModal = (about: string) => {
    isAboutModalVisible.value = true;
    isContactModalVisible.value = false;
    activeTab.value = about;
  };

  const closeAboutModal = (todoList: string) => {
    isAboutModalVisible.value = false;
    activeTab.value = todoList;
  };
  return { isAboutModalVisible, openAboutModal, closeAboutModal, activeTab };
});

export const useContactModalStore = defineStore('contactModal', () => {
  const openContactModal = (contact: string) => {
    isContactModalVisible.value = true;
    isAboutModalVisible.value = false;
    activeTab.value = contact;
  };

  const closeContactModal = (todoList: string) => {
    isContactModalVisible.value = false;
    activeTab.value = todoList;
  };
  return { isContactModalVisible, openContactModal, closeContactModal, activeTab };
});
