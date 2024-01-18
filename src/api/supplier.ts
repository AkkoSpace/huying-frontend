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
