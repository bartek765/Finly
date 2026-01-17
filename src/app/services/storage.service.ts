import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Invoice, Expense, Client } from '../models';
import { DEFAULT_INVOICES, DEFAULT_EXPENSES, DEFAULT_CLIENTS } from '../data';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly INVOICES_KEY = 'ksiegowi_invoices';
  private readonly EXPENSES_KEY = 'ksiegowi_expenses';
  private readonly CLIENTS_KEY = 'ksiegowi_clients';

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  invoices = signal<Invoice[]>(this.loadInvoices());
  expenses = signal<Expense[]>(this.loadExpenses());
  clients = signal<Client[]>(this.loadClients());

  private loadInvoices(): Invoice[] {
    if (!this.isBrowser) return DEFAULT_INVOICES;
    const data = localStorage.getItem(this.INVOICES_KEY);
    return data ? JSON.parse(data) : DEFAULT_INVOICES;
  }

  private loadExpenses(): Expense[] {
    if (!this.isBrowser) return DEFAULT_EXPENSES;
    const data = localStorage.getItem(this.EXPENSES_KEY);
    return data ? JSON.parse(data) : DEFAULT_EXPENSES;
  }

  private loadClients(): Client[] {
    if (!this.isBrowser) return DEFAULT_CLIENTS;
    const data = localStorage.getItem(this.CLIENTS_KEY);
    return data ? JSON.parse(data) : DEFAULT_CLIENTS;
  }

  private saveInvoices(invoices: Invoice[]): void {
    if (this.isBrowser) {
      localStorage.setItem(this.INVOICES_KEY, JSON.stringify(invoices));
    }
    this.invoices.set(invoices);
  }

  private saveExpenses(expenses: Expense[]): void {
    if (this.isBrowser) {
      localStorage.setItem(this.EXPENSES_KEY, JSON.stringify(expenses));
    }
    this.expenses.set(expenses);
  }

  private saveClients(clients: Client[]): void {
    if (this.isBrowser) {
      localStorage.setItem(this.CLIENTS_KEY, JSON.stringify(clients));
    }
    this.clients.set(clients);
  }

  addInvoice(invoice: Omit<Invoice, 'id'>): void {
    const newInvoice: Invoice = {
      ...invoice,
      id: Date.now().toString()
    };
    const updated = [newInvoice, ...this.invoices()];
    this.saveInvoices(updated);
  }

  updateInvoice(id: string, invoice: Partial<Invoice>): void {
    const updated = this.invoices().map(inv =>
      inv.id === id ? { ...inv, ...invoice } : inv
    );
    this.saveInvoices(updated);
  }

  deleteInvoice(id: string): void {
    const updated = this.invoices().filter(inv => inv.id !== id);
    this.saveInvoices(updated);
  }

  addExpense(expense: Omit<Expense, 'id'>): void {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString()
    };
    const updated = [newExpense, ...this.expenses()];
    this.saveExpenses(updated);
  }

  updateExpense(id: string, expense: Partial<Expense>): void {
    const updated = this.expenses().map(exp =>
      exp.id === id ? { ...exp, ...expense } : exp
    );
    this.saveExpenses(updated);
  }

  deleteExpense(id: string): void {
    const updated = this.expenses().filter(exp => exp.id !== id);
    this.saveExpenses(updated);
  }

  addClient(client: Omit<Client, 'id'>): void {
    const newClient: Client = {
      ...client,
      id: Date.now().toString()
    };
    const updated = [newClient, ...this.clients()];
    this.saveClients(updated);
  }

  updateClient(id: string, client: Partial<Client>): void {
    const updated = this.clients().map(cli =>
      cli.id === id ? { ...cli, ...client } : cli
    );
    this.saveClients(updated);
  }

  deleteClient(id: string): void {
    const updated = this.clients().filter(cli => cli.id !== id);
    this.saveClients(updated);
  }
}
