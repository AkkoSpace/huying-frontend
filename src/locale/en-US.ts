import localeMessageBox from '@/components/message-box/locale/en-US';
import localeLogin from '@/views/login/locale/en-US';
import localeNavbar from '@/components/navbar/locale/en-US';
import localeScreen from '@/views/dashboard/screen/locale/en-US';
import localeProductInfo from '@/views/product/info/locale/en-US';
import localeProductPrice from '@/views/product/price/locale/zh-CN';
import localeWarehouseInfo from '@/views/warehouse/info/locale/en-US';
import localeSupplierInfo from '@/views/supplier/info/locale/en-US';
import localeSettings from './en-US/settings';
import localeCommon from './zh-CN/common';
import localeMenu from './en-US/menu';

export default {
  ...localeSettings,
  ...localeNavbar,
  ...localeMessageBox,
  ...localeLogin,
  ...localeScreen,
  ...localeMenu,
  ...localeProductInfo,
  ...localeProductPrice,
  ...localeWarehouseInfo,
  ...localeSupplierInfo,
  ...localeCommon,
};
