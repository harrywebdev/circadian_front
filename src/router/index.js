import Index from '@/views/Index';
import AddDaylog from '@/views/AddDaylog';
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  { name: 'index', path: '/', component: Index },
  { name: 'daylogs.create', path: '/add/:date', component: AddDaylog, props: true },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
