import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import HomepageView from '../views/HomepageView.vue';
import TodoView from '@/views/TodoView.vue';
import NotFoundPage from '@/components/NotFoundPage.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', component: HomepageView },
  { path: '/todo', component: TodoView },
  { path: '/:pathMatch(.*)*', component: NotFoundPage },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
