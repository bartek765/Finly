export interface Client {
  id: string;
  name: string;
  nip: string;
  email: string;
  phone: string;
  address: string;
  totalInvoices: number;
  totalRevenue: number;
  status: 'active' | 'inactive';
}

