import axios from 'axios';

export interface addProductBrandData {
  brandName: string;
}

export function getProductInfo() {
  return axios.get('/basic/product');
}
export function getProductBrand() {
  return axios.get('/basic/productBrand');
}

export function addProductBrand(data: addProductBrandData) {
  return axios.post('/basic/productBrand', data);
}

export function getProductCategory() {
  return axios.get('/basic/productCategory');
}
