<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from './components/headerComp.vue';
import CreateItem from './components/CreateItem.vue';
import UpdateItem from './components/UpdateItem.vue';
import { useAboutModalStore, useContactModalStore } from './stores/headerModalStore.ts';
import { useCreateModalStore, createItem, useUpdateModalStore } from './stores/CreateItemStore';
import AboutComp from './components/AboutComp.vue';
import ContactComp from './components/ContactComp.vue';

const contactModalStore = useContactModalStore();
const aboutModalStore = useAboutModalStore();
const updateModalStore = useUpdateModalStore();
const modalStore = useCreateModalStore();
const todoCreateItem = createItem();
</script>

<template>
  <div class="">
    <Header class="m-2" />

    <CreateItem
      :showModal="modalStore.isModalVisible"
      @close="modalStore.closeModal"
      @createItemTodo="todoCreateItem.createItemApi"
    />
    <UpdateItem
      :showModal="updateModalStore.isUpdateModalVisible"
      @close="updateModalStore.closeUpdateModal"
      @updateCurrentItemTodos="todoCreateItem.isTodosComplete"
    ></UpdateItem>
    <ContactComp :showContactModal="contactModalStore.isContactModalVisible"></ContactComp>
    <AboutComp :showAboutModal="aboutModalStore.isAboutModalVisible"></AboutComp>
    <RouterView> </RouterView>
  </div>
</template>

<style scoped></style>
