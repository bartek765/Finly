import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';
import { InvoicesComponent } from './components/invoices/invoices';
import { ExpensesComponent } from './components/expenses/expenses';
import { ClientsComponent } from './components/clients/clients';
import { ReportsComponent } from './components/reports/reports';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'invoices', component: InvoicesComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'reports', component: ReportsComponent },
];
