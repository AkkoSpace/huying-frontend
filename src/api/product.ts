import axios from 'axios';

export interface addProductBrandData {
  brandName: string;
}

export interface updateProductBrandData {
  id: number;
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

export function deleteProductBrand(id: number) {
  return axios.delete(`/basic/productBrand/${id}`);
}

export function updateProductBrand(data: updateProductBrandData) {
  return axios.put(`/basic/productBrand`, data);
}

export function getProductCategory() {
  return axios.get('/basic/productCategory');
}
