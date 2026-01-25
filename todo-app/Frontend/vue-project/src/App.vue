<script setup lang="ts">
import { routerKey, RouterView } from 'vue-router';
import router from './router';
import Homepage from './views/HomepageView.vue';
import Header from './components/headerComp.vue';
import CreateItem from './components/CreateItem.vue';
import { useModalStore } from './stores/CreateItemStore';

const modalStore = useModalStore();
</script>

<template>
  <div class="">
    <Header class="m-2" />
    <CreateItem :showModal="modalStore.isModalVisible" @close="modalStore.closeModal" />
    <RouterView> </RouterView>
  </div>
</template>

<style scoped></style>
