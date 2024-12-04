import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Tasks from '../views/Tasks.vue';
import Calendar from '../views/Calendar.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar
    }
  ]
});

export default router;