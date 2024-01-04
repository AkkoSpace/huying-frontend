import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const SYSTEM: AppRouteRecordRaw = {
  path: '/system',
  name: 'System',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.system',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 9,
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
      path: 'user',
      name: 'User',
      component: () => import('@/views/system/user/index.vue'),
      meta: {
        locale: 'menu.system.user',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default SYSTEM;
