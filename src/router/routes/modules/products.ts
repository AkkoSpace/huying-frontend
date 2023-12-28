import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const products: AppRouteRecordRaw = {
  path: '/products',
  name: 'products',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.products',
    requiresAuth: true,
    icon: 'icon-list',
    order: 2,
  },
  children: [
    {
      path: 'products-list', // The midline path complies with SEO specifications
      name: 'ProductsList',
      component: () => import('@/views/products/list/index.vue'),
      meta: {
        locale: 'menu.products.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default products;
