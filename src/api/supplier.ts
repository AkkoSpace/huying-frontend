import axios from 'axios';

export interface addSupplierData {
  supplierName: string;
  supplierAddress: string;
}

export interface updateSupplierData {
  id: number;
  supplierName: string;
  supplierAddress: string;
}

export interface addSupplierPriceData {
  productId: string;
  purchasePrice: number;
}

export interface updateSupplierPriceData {
  id: number;
  productId: string;
  purchasePrice: number;
}

export function getSupplier() {
  return axios.get('/purchase/supplier');
}

export function addSupplier(data: addSupplierData) {
  return axios.post('/purchase/supplier', data);
}

export function updateSupplier(data: updateSupplierData) {
  return axios.put(`/purchase/supplier`, data);
}

export function deleteSupplier(id: number) {
  return axios.delete(`/purchase/supplier/${id}`);
}

export function getSupplierPrice() {
  return axios.get('/purchase/supplier/price');
}

export function addSupplierPrice(data: addSupplierPriceData) {
  return axios.post('/purchase/supplier/price', data);
}

export function updateSupplierPrice(data: updateSupplierPriceData) {
  return axios.put(`/purchase/supplier/price`, data);
}

export function deleteSupplierPrice(id: number) {
  return axios.delete(`/purchase/supplier/price/${id}`);
}
