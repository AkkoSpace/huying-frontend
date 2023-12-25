import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const COMPANIES: AppRouteRecordRaw = {
  path: '/companies',
  name: 'companies',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.companies',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 3,
  },
  children: [
    {
      path: 'companies-list',
      name: 'CompaniesList',
      component: () => import('@/views/companies/list/index.vue'),
      meta: {
        locale: 'menu.companies.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default COMPANIES;
