import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InvoiceStateService {
  prefilledClient = signal<string | null>(null);

  constructor(private router: Router) {}

  createInvoiceForClient(clientName: string): void {
    this.prefilledClient.set(clientName);
    this.router.navigate(['/invoices']);
  }

  clearPrefilledClient(): void {
    this.prefilledClient.set(null);
  }
}

