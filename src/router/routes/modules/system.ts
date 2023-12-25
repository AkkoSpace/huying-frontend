import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const COMPANIES: AppRouteRecordRaw = {
  path: '/system',
  name: 'system',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.system',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 4,
  },
  children: [
    {
      path: 'setting',
      name: 'Setting',
      component: () => import('@/views/system/setting/index.vue'),
      meta: {
        locale: 'menu.system.setting',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'users',
      name: 'Users',
      component: () => import('@/views/system/users/index.vue'),
      meta: {
        locale: 'menu.system.users',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default COMPANIES;
