import { Expense } from '../models/expense.model';

export const DEFAULT_EXPENSES: Expense[] = [
  { id: '1', description: 'Zakup oprogramowania księgowego', category: 'Software', amount: 2500, date: '2024-12-09', vendor: 'SoftTech', paymentMethod: 'Przelew' },
  { id: '2', description: 'Czynsz biurowy - grudzień', category: 'Rent', amount: 4500, date: '2024-12-01', vendor: 'Office Space Ltd.', paymentMethod: 'Przelew' },
  { id: '3', description: 'Materiały biurowe', category: 'Supplies', amount: 680, date: '2024-12-08', vendor: 'Office Depot', paymentMethod: 'Karta' },
  { id: '4', description: 'Szkolenie VAT 2024', category: 'Training', amount: 1200, date: '2024-12-05', vendor: 'Tax Academy', paymentMethod: 'Przelew' },
  { id: '5', description: 'Usługi księgowe - outsourcing', category: 'Services', amount: 3500, date: '2024-12-03', vendor: 'Accounting Pro', paymentMethod: 'Przelew' },
  { id: '6', description: 'Abonament telefoniczny', category: 'Utilities', amount: 280, date: '2024-12-01', vendor: 'Telecom Plus', paymentMethod: 'Polecenie zapłaty' },
  { id: '7', description: 'Paliwo - samochód służbowy', category: 'Transport', amount: 450, date: '2024-12-07', vendor: 'Orlen', paymentMethod: 'Karta' },
  { id: '8', description: 'Ubezpieczenie OC firmy', category: 'Insurance', amount: 1800, date: '2024-12-02', vendor: 'PZU', paymentMethod: 'Przelew' },
];

