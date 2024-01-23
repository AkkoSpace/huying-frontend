import axios from 'axios';

export interface addWarehouseData {
  warehouseName: string;
  warehouseAddress: string;
  warehouseStatus: number;
}

export interface updateWarehouseData {
  id: number;
  warehouseName: string;
  warehouseAddress: string;
  warehouseStatus: number;
}

export function addWarehouse(data: addWarehouseData) {
  return axios.post('/basic/warehouse', data);
}

export function deleteWarehouse(id: number) {
  return axios.delete(`/basic/warehouse/${id}`);
}

export function updateWarehouse(data: updateWarehouseData) {
  return axios.put(`/basic/warehouse`, data);
}

export function getWarehouse() {
  return axios.get('/basic/warehouse');
}
