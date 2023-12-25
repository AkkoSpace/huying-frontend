import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const GOODS: AppRouteRecordRaw = {
  path: '/goods',
  name: 'goods',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.goods',
    requiresAuth: true,
    icon: 'icon-list',
    order: 2,
  },
  children: [
    {
      path: 'goods-list', // The midline path complies with SEO specifications
      name: 'GoodsList',
      component: () => import('@/views/goods/list/index.vue'),
      meta: {
        locale: 'menu.goods.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default GOODS;
