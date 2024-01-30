import axios from 'axios';

export interface addProductInfoData {
  brandId: string;
  categoryId: string;
  productName: string;
  barCode: string;
  productSpec: string;
  productUnit: string;
  purchasePrice: number;
  standardPrice: number;
}

export interface updateProductInfoData {
  id: number;
  brandId: string;
  categoryId: string;
  productName: string;
  barCode: string;
  productSpec: string;
  productUnit: string;
  purchasePrice: number;
  standardPrice: number;
}

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

export interface addProductSellingPriceData {
  productId: string;
  purchasePrice: number;
  standardPrice: number;
  sellingPrice: number;
  productProfit: number;
  priceLevel: number;
}

export interface updateProductSellingPriceData {
  id: number;
  productId: string;
  purchasePrice: number;
  standardPrice: number;
  sellingPrice: number;
  productProfit: number;
  priceLevel: number;
}

export function getProductInfo() {
  return axios.get('/basic/product');
}

export function searchProductInfo(productName: string) {
  return axios.get(`/basic/product/search?productName=${productName}`);
}

export function addProductInfo(data: addProductInfoData) {
  return axios.post('/basic/product', data);
}

export function updateProductInfo(data: updateProductInfoData) {
  return axios.put(`/basic/product`, data);
}

export function deleteProductInfo(id: number) {
  return axios.delete(`/basic/product/${id}`);
}

export function getProductBrand() {
  return axios.get('/basic/productBrand');
}

export function searchProductBrand(brandName: string) {
  return axios.get(`/basic/productBrand/search?brandName=${brandName}`);
}

export function addProductBrand(data: addProductBrandData) {
  return axios.post('/basic/productBrand', data);
}

export function updateProductBrand(data: updateProductBrandData) {
  return axios.put(`/basic/productBrand`, data);
}

export function deleteProductBrand(id: number) {
  return axios.delete(`/basic/productBrand/${id}`);
}

export function getProductCategory() {
  return axios.get('/basic/productCategory');
}

export function searchProductCategory(value: string) {
  return axios.get(`/basic/productCategory/search?value=${value}`);
}

export function addProductCategory(data: addProductCategoryData) {
  return axios.post('/basic/productCategory', data);
}

export function updateProductCategory(data: updateProductCategoryData) {
  return axios.put(`/basic/productCategory`, data);
}

export function deleteProductCategory(id: number) {
  return axios.delete(`/basic/productCategory/${id}`);
}

export function getProductSellingPrice() {
  return axios.get('/basic/product/sellingPrice');
}

export function addProductSellingPrice(data: addProductSellingPriceData) {
  return axios.post('/basic/product/sellingPrice', data);
}

export function updateProductSellingPrice(data: updateProductSellingPriceData) {
  return axios.put(`/basic/product/sellingPrice`, data);
}

export function deleteProductSellingPrice(id: number) {
  return axios.delete(`/basic/product/sellingPrice/${id}`);
}
