import {inject, Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {Invoice} from '../models';

@Injectable({
  providedIn: 'root'
})
export class InvoiceFacade {
  private storage = inject(StorageService);

  get invoices() {
    return this.storage.invoices;
  }

  create(invoice: Omit<Invoice, 'id'>): void {
    this.storage.addInvoice(invoice);
  }

  update(id: string, invoice: Partial<Invoice>): void {
    this.storage.updateInvoice(id, invoice);
  }

  remove(id: string): void {
    this.storage.deleteInvoice(id);
  }

  downloadAsText(invoice: Invoice): void {
    const content = this.formatInvoiceText(invoice);
    const blob = new Blob([content], {type: 'text/plain;charset=utf-8'});
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${invoice.number.replace(/\//g, '-')}.txt`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  private formatInvoiceText(invoice: Invoice): string {
    return `
FAKTURA ${invoice.number}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Klient: ${invoice.client}
Data wystawienia: ${invoice.date}
Termin płatności: ${invoice.dueDate}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

KWOTA DO ZAPŁATY: ${invoice.amount.toLocaleString('pl-PL')} zł
Status: ${this.getStatusLabel(invoice.status)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Wygenerowano: ${new Date().toLocaleString('pl-PL')}
    `;
  }

  private getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      paid: 'Opłacona',
      pending: 'Oczekująca',
      overdue: 'Przeterminowana'
    };
    return labels[status] || status;
  }
}

