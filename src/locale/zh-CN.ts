import localeLogin from '@/views/login/locale/zh-CN';
import localeMessageBox from '@/components/message-box/locale/zh-CN';
import localeNavbar from '@/components/navbar/locale/zh-CN';
import localeScreen from '@/views/dashboard/screen/locale/zh-CN';
import localeProductInfo from '@/views/product/info/locale/zh-CN';
import localeProductPrice from '@/views/product/price/locale/zh-CN';
import localeWarehouseInfo from '@/views/warehouse/info/locale/zh-CN';
import localeSupplierInfo from '@/views/supplier/info/locale/zh-CN';
import localeSettings from './zh-CN/settings';
import localeMenu from './zh-CN/menu';
import localeCommon from './zh-CN/common';

export default {
  ...localeCommon,
  ...localeSettings,
  ...localeMenu,
  ...localeNavbar,
  ...localeMessageBox,
  ...localeLogin,
  ...localeScreen,
  ...localeProductInfo,
  ...localeProductPrice,
  ...localeWarehouseInfo,
  ...localeSupplierInfo,
};
