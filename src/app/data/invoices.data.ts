import { Invoice } from '../models/invoice.model';

export const DEFAULT_INVOICES: Invoice[] = [
  { id: '1', number: 'FV/12/2024/089', client: 'ABC Sp. z o.o.', date: '2024-12-08', dueDate: '2024-12-22', amount: 12500, status: 'paid' },
  { id: '2', number: 'FV/12/2024/088', client: 'XYZ S.A.', date: '2024-12-07', dueDate: '2024-12-21', amount: 8450, status: 'pending' },
  { id: '3', number: 'FV/12/2024/087', client: 'Tech Solutions', date: '2024-11-28', dueDate: '2024-12-12', amount: 15230, status: 'overdue' },
  { id: '4', number: 'FV/12/2024/086', client: 'Marketing Pro', date: '2024-12-05', dueDate: '2024-12-19', amount: 6780, status: 'paid' },
  { id: '5', number: 'FV/12/2024/085', client: 'Design Studio', date: '2024-12-04', dueDate: '2024-12-18', amount: 9200, status: 'pending' },
  { id: '6', number: 'FV/12/2024/084', client: 'Consulting Group', date: '2024-12-03', dueDate: '2024-12-17', amount: 18500, status: 'paid' },
  { id: '7', number: 'FV/12/2024/083', client: 'IT Services Ltd.', date: '2024-12-02', dueDate: '2024-12-16', amount: 11300, status: 'pending' },
  { id: '8', number: 'FV/11/2024/082', client: 'Global Trade Co.', date: '2024-11-20', dueDate: '2024-12-04', amount: 7850, status: 'overdue' },
];

