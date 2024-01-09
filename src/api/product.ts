import axios from 'axios';

export function getProductBrand() {
  return axios.get('/basic/productBrand');
}

export function getProductCategory() {
  return axios.get('/basic/productCategory');
}
