import axios from 'axios';

export interface ListTransactionData {
  current: number;
  pageSize: number;
  transactionId?: string;
  transactionDate?: string;
  amount?: number;
}

export function listTransaction(data: ListTransactionData) {
  return axios.get('/api/transaction/list/page', { params: data });
}

export interface AddTransactionData {
  userId: string | undefined;
  transactionId: string;
  transactionDate: string;
  amount: number;
  status: number;
  description: string;
}

export function addTransaction(data: AddTransactionData) {
  return axios.post('/api/transaction/add', data);
}

export function getTransaction(id: string) {
  return axios.get('/api/transaction/get', { params: { id } });
}
