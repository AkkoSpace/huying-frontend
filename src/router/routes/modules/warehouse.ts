import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const WAREHOUSE: AppRouteRecordRaw = {
  path: '/warehouse',
  name: 'Warehouse',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.warehouse',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 2,
  },
  children: [
    {
      path: 'info',
      name: 'WarehouseInfo',
      component: () => import('@/views/warehouse/info/index.vue'),
      meta: {
        locale: 'menu.warehouse.info',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default WAREHOUSE;
