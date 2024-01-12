import axios from 'axios';

export interface addProductBrandData {
  brandName: string;
}

export interface updateProductBrandData {
  id: number;
  brandName: string;
}

export interface addProductCategoryData {
  productAttribute: string;
  productType: string;
}

export interface updateProductCategoryData {
  id: number;
  productAttribute: string;
  productType: string;
}

export function getProductInfo() {
  return axios.get('/basic/product');
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

export function getProductBrand() {
  return axios.get('/basic/productBrand');
}

export function addProductCategory(data: addProductCategoryData) {
  return axios.post('/basic/productCategory', data);
}

export function deleteProductCategory(id: number) {
  return axios.delete(`/basic/productCategory/${id}`);
}

export function updateProductCategory(data: updateProductCategoryData) {
  return axios.put(`/basic/productCategory`, data);
}

export function getProductCategory() {
  return axios.get('/basic/productCategory');
}
