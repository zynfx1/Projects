<script setup lang="ts">
import { routerKey, RouterView } from 'vue-router';
import type { todoUser } from './types/todoUser.ts';
import router from './router';
import Homepage from './views/HomepageView.vue';
import Header from './components/headerComp.vue';
import CreateItem from './components/CreateItem.vue';
import UpdateItem from './components/UpdateItem.vue';
import { useCreateModalStore, createItem, useUpdateModalStore } from './stores/CreateItemStore';
import TodoView from './views/TodoView.vue';

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
    <RouterView> </RouterView>
  </div>
</template>

<style scoped></style>
