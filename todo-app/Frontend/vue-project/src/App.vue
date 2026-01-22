<script setup lang="ts">
import { routerKey, RouterView } from 'vue-router';
import router from './router';
import Homepage from './views/HomepageView.vue';
import Header from './components/headerComp.vue';
</script>

<template>
  <div class="">
    <Header />

    <RouterView>
      
    </RouterView>
  </div>
</template>

<style scoped></style>
