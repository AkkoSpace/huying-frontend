import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const PRODUCT: AppRouteRecordRaw = {
  path: '/product',
  name: 'Product',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.product',
    requiresAuth: true,
    icon: 'icon-gift',
    order: 1,
  },
  children: [
    {
      path: 'info',
      name: 'ProductInfo',
      component: () => import('@/views/product/info/index.vue'),
      meta: {
        locale: 'menu.product.info',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'price',
      name: 'ProductPrice',
      component: () => import('@/views/product/price/index.vue'),
      meta: {
        locale: 'menu.product.price',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default PRODUCT;
