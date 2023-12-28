import localeLogin from '@/views/login/locale/zh-CN';
import localeMessageBox from '@/components/message-box/locale/zh-CN';
import localeNavbar from '@/components/navbar/locale/zh-CN';
import localeWorkplace from '@/views/dashboard/workplace/locale/zh-CN';
import localeTransactionOrder from '@/views/transaction/order/locale/zh-CN';
import localeSettings from './zh-CN/settings';

export default {
  'menu.dashboard': '仪表盘',
  'menu.transaction': '交易管理',
  'menu.transaction.order': '订单管理',
  'menu.products': '产品管理',
  'menu.products.list': '产品列表',
  'menu.companies': '公司管理',
  'menu.companies.list': '公司列表',
  'menu.system': '系统管理',
  'menu.system.setting': '系统设置',
  'menu.system.users': '用户管理',
  'navbar.action.locale': '切换为中文',
  ...localeSettings,
  ...localeNavbar,
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,
  ...localeTransactionOrder,
};
