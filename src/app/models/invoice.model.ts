export interface Invoice {
  id: string;
  number: string;
  client: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
}

