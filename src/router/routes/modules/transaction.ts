import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const FORM: AppRouteRecordRaw = {
  path: '/transaction',
  name: 'transaction',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.transaction',
    icon: 'icon-calendar-clock',
    requiresAuth: true,
    order: 3,
  },
  children: [
    {
      path: 'order',
      name: 'Order',
      component: () => import('@/views/transaction/order/index.vue'),
      meta: {
        locale: 'menu.transaction.order',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default FORM;
