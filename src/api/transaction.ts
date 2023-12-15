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
