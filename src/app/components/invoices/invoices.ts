import { Component, signal, computed, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Filter, Eye, Download, X } from 'lucide-angular';
import { Invoice } from '../../models';
import { InvoiceFacade } from '../../services/invoice.facade';
import { InvoiceStateService } from '../../services/invoice-state.service';

@Component({
  selector: 'app-invoices',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './invoices.html',
  styleUrl: './invoices.scss'
})
export class InvoicesComponent {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Filter = Filter;
  readonly Download = Download;
  readonly Eye = Eye;
  readonly X = X;

  private facade = inject(InvoiceFacade);
  private invoiceState = inject(InvoiceStateService);

  searchQuery = signal('');
  filterStatus = signal('all');
  showModal = signal(false);
  showViewModal = signal(false);
  selectedInvoice = signal<Invoice | null>(null);

  newInvoice = {
    number: '',
    client: '',
    date: '',
    dueDate: '',
    amount: 0,
    status: 'pending' as 'paid' | 'pending' | 'overdue'
  };

  invoices = this.facade.invoices;

  constructor() {
    effect(() => {
      const prefilledClient = this.invoiceState.prefilledClient();
      if (prefilledClient) {
        this.newInvoice.client = prefilledClient;
        this.openModal();
        this.invoiceState.clearPrefilledClient();
      }
    });
  }

  filteredInvoices = computed(() => {
    return this.invoices().filter((invoice) => {
      const matchesSearch = invoice.number.toLowerCase().includes(this.searchQuery().toLowerCase()) ||
                           invoice.client.toLowerCase().includes(this.searchQuery().toLowerCase());
      const matchesFilter = this.filterStatus() === 'all' || invoice.status === this.filterStatus();
      return matchesSearch && matchesFilter;
    });
  });

  totalAmount = computed(() =>
    this.filteredInvoices().reduce((sum, inv) => sum + inv.amount, 0)
  );

  paidAmount = computed(() =>
    this.filteredInvoices().filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0)
  );

  pendingAmount = computed(() =>
    this.filteredInvoices().filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0)
  );

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      paid: 'Opłacona',
      pending: 'Oczekująca',
      overdue: 'Przeterminowana'
    };
    return labels[status] || status;
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      paid: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      overdue: 'bg-red-100 text-red-700'
    };
    return classes[status] || '';
  }

  formatNumber(num: number): string {
    return num.toLocaleString('pl-PL');
  }

  openModal(): void {
    this.showModal.set(true);
    if (!this.newInvoice.client) {
      this.resetForm();
    } else {
      this.updateDatesAndNumber();
    }
  }

  closeModal(): void {
    this.showModal.set(false);
    this.resetForm();
  }

  resetForm(): void {
    const today = new Date().toISOString().split('T')[0];
    const dueDate = this.calculateDueDate(14);

    this.newInvoice = {
      number: this.generateInvoiceNumber(),
      client: '',
      date: today,
      dueDate: dueDate.toISOString().split('T')[0],
      amount: 0,
      status: 'pending'
    };
  }

  private updateDatesAndNumber(): void {
    const today = new Date().toISOString().split('T')[0];
    const dueDate = this.calculateDueDate(14);

    this.newInvoice.number = this.generateInvoiceNumber();
    this.newInvoice.date = today;
    this.newInvoice.dueDate = dueDate.toISOString().split('T')[0];
    this.newInvoice.amount = 0;
    this.newInvoice.status = 'pending';
  }

  private calculateDueDate(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }

  generateInvoiceNumber(): string {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const lastInvoice = this.invoices()[0];
    let nextNumber = 1;

    if (lastInvoice) {
      const match = lastInvoice.number.match(/\/(\d+)$/);
      if (match) {
        nextNumber = parseInt(match[1]) + 1;
      }
    }

    return `FV/${month}/${year}/${String(nextNumber).padStart(3, '0')}`;
  }

  submitInvoice(): void {
    const invoice = this.newInvoice;

    if (!this.isValidInvoice(invoice)) {
      alert('Proszę wypełnić wszystkie pola');
      return;
    }

    this.facade.create(invoice);
    this.closeModal();
  }

  private isValidInvoice(invoice: typeof this.newInvoice): boolean {
    return !!(invoice.number && invoice.client && invoice.date && invoice.dueDate && invoice.amount > 0);
  }

  viewInvoice(invoice: Invoice): void {
    this.selectedInvoice.set(invoice);
    this.showViewModal.set(true);
  }

  closeViewModal(): void {
    this.showViewModal.set(false);
    this.selectedInvoice.set(null);
  }

  downloadInvoice(invoice: Invoice): void {
    this.facade.downloadAsText(invoice);
  }
}

