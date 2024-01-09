import localeLogin from '@/views/login/locale/zh-CN';
import localeMessageBox from '@/components/message-box/locale/zh-CN';
import localeNavbar from '@/components/navbar/locale/zh-CN';
import localeWorkplace from '@/views/dashboard/workplace/locale/zh-CN';
import localeProductInfo from '@/views/product/info/locale/zh-CN';
import localeSettings from './zh-CN/settings';
// @ts-ignore
import localeMenu from './zh-CN/menu';

export default {
  ...localeSettings,
  ...localeNavbar,
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,
  ...localeMenu,
  ...localeProductInfo,
};
