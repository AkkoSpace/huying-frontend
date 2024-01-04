import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const PURCHASE: AppRouteRecordRaw = {
  path: '/purchase',
  name: 'Purchase',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.purchase',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 4,
  },
  children: [
    {
      path: 'order',
      name: 'PurchaseOrder',
      component: () => import('@/views/purchase/order/index.vue'),
      meta: {
        locale: 'menu.purchase.order',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default PURCHASE;
