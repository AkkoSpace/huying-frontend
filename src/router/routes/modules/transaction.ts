import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const TRANSACTION: AppRouteRecordRaw = {
  path: '/transaction',
  name: 'transaction',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.transaction',
    requiresAuth: true,
    icon: 'icon-list',
    order: 1,
  },
  children: [
    {
      path: 'transaction-order', // The midline path complies with SEO specifications
      name: 'TransactionOrder',
      component: () => import('@/views/transaction/order/index.vue'),
      meta: {
        locale: 'menu.transaction.order',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default TRANSACTION;
