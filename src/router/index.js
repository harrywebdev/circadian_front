import Index from '@/views/Index';
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [{ path: '/', component: Index }];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
