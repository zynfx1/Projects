<script setup lang="ts">
import { routerKey, RouterView } from 'vue-router';
import router from './router';
import Homepage from './views/HomepageView.vue';
import Header from './components/headerComp.vue';
import CreateItem from './components/CreateItem.vue';
import { useModalStore, createItem } from './stores/CreateItemStore';
import TodoView from './views/TodoView.vue';

const modalStore = useModalStore();
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

    <RouterView> </RouterView>
  </div>
</template>

<style scoped></style>
