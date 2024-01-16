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

export function addSupplier(data: addSupplierData) {
  return axios.post('/basic/supplier', data);
}

export function deleteSupplier(id: number) {
  return axios.delete(`/basic/supplier/${id}`);
}

export function updateSupplier(data: updateSupplierData) {
  return axios.put(`/basic/supplier`, data);
}

export function getSupplier() {
  return axios.get('/basic/supplier');
}
