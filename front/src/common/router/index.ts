import { createRouter, createWebHistory } from 'vue-router';
import DashboardRoutes from './DashboardRoutes';
import { useAuthStore } from '@/common/stores/auth';
import _ from 'lodash';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/assets/layouts/full/FullLayout.vue')
    },
    {
      path: '/error',
      component: () => import('@/views/pages/maintenance/Error404.vue')
    },
    {
      path: '/login',
      component: () => import('@/views/apps/Login.vue')
    },
    {
      name: 'add_edit',
      path: '/:model/:url',
      component: () => import('@/views/components/form/AddEditForm.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/pages/maintenance/Error404.vue')
    },
    ...[DashboardRoutes]
  ],
  linkActiveClass: 'active'
});

router.beforeEach(async (to, from, next) => {
  const auth_store: any = useAuthStore();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!auth_store.authenticated) {
      next('login');
    } else next();
  } else next();
});
