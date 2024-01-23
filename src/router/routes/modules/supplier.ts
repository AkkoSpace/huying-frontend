import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const SUPPLIER: AppRouteRecordRaw = {
  path: '/supplier',
  name: 'Supplier',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.supplier',
    requiresAuth: true,
    icon: 'icon-relation',
    order: 3,
  },
  children: [
    {
      path: 'info',
      name: 'SupplierInfo',
      component: () => import('@/views/supplier/info/index.vue'),
      meta: {
        locale: 'menu.supplier.info',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'price',
      name: 'SupplierPrice',
      component: () => import('@/views/supplier/price/index.vue'),
      meta: {
        locale: 'menu.supplier.price',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default SUPPLIER;
