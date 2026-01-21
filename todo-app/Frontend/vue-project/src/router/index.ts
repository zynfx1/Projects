import { createRouter, createWebHistory } from 'vue-router';
import HomepageView from '../views/HomepageView.vue';

const routes = [{ path: '/home', component: HomepageView }];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
