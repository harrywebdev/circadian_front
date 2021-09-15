import Index from '@/views/Index';
import DaylogForm from '@/views/DaylogForm';
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  { name: 'index', path: '/', component: Index },
  { name: 'daylogform', path: '/daylog/:date', component: DaylogForm, props: true },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
