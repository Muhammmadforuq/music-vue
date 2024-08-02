import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue';
import AboutPage from '@/views/AboutPage.vue';
import ManagePage from '@/views/ManagePage.vue';
import NotFound from '@/components/NotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage
    },
    {
      path: '/manage',
      name: 'manage',
      component: ManagePage,
    },
    { path: '/:pathMatch(.*)*', 
      name: 'NotFound',
      component: NotFound 
    },
  ],
})

export default router
