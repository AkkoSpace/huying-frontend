import localeMessageBox from '@/components/message-box/locale/en-US';
import localeLogin from '@/views/login/locale/en-US';
import localeNavbar from '@/components/navbar/locale/en-US';

import localeWorkplace from '@/views/dashboard/workplace/locale/en-US';

import localeSettings from './en-US/settings';

export default {
  'menu.dashboard': 'Dashboard',
  'menu.transaction': 'Transaction',
  'menu.transaction.order': 'Order',
  'menu.goods': 'Goods',
  'menu.goods.list': 'Goods List',
  'menu.companies': 'Companies',
  'menu.companies.list': 'Companies List',
  'menu.system': 'System',
  'menu.system.setting': 'Setting',
  'menu.system.users': 'Users',
  'navbar.action.locale': 'Switch to English',
  ...localeSettings,
  ...localeNavbar,
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,
};
