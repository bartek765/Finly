import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Mail, Phone, Building, X } from 'lucide-angular';
import { Client } from '../../models';
import { ClientFacade } from '../../services/client.facade';
import { InvoiceStateService } from '../../services/invoice-state.service';

@Component({
  selector: 'app-clients',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './clients.html',
  styleUrl: './clients.scss'
})
export class ClientsComponent {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Mail = Mail;
  readonly Phone = Phone;
  readonly Building = Building;
  readonly X = X;

  private facade = inject(ClientFacade);
  private invoiceState = inject(InvoiceStateService);

  searchQuery = signal('');
  showModal = signal(false);
  showViewModal = signal(false);
  selectedClient = signal<Client | null>(null);

  newClient = {
    name: '',
    nip: '',
    email: '',
    phone: '',
    address: '',
    totalInvoices: 0,
    totalRevenue: 0,
    status: 'active' as 'active' | 'inactive'
  };

  clients = this.facade.clients;

  filteredClients = computed(() => {
    return this.clients().filter((client) =>
      client.name.toLowerCase().includes(this.searchQuery().toLowerCase()) ||
      client.nip.includes(this.searchQuery()) ||
      client.email.toLowerCase().includes(this.searchQuery().toLowerCase())
    );
  });

  totalClients = computed(() => this.filteredClients().length);

  activeClients = computed(() =>
    this.filteredClients().filter(c => c.status === 'active').length
  );

  totalRevenue = computed(() =>
    this.filteredClients().reduce((sum, c) => sum + c.totalRevenue, 0)
  );

  formatNumber(num: number): string {
    return num.toLocaleString('pl-PL');
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      active: 'Aktywny',
      inactive: 'Nieaktywny'
    };
    return labels[status] || status;
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      active: 'bg-green-100 text-green-700',
      inactive: 'bg-gray-100 text-gray-700'
    };
    return classes[status] || '';
  }

  openModal(): void {
    this.showModal.set(true);
    this.resetForm();
  }

  closeModal(): void {
    this.showModal.set(false);
    this.resetForm();
  }

  resetForm(): void {
    this.newClient = {
      name: '',
      nip: '',
      email: '',
      phone: '',
      address: '',
      totalInvoices: 0,
      totalRevenue: 0,
      status: 'active'
    };
  }

  submitClient(): void {
    const client = this.newClient;

    if (!this.isValidClient(client)) {
      alert('Proszę wypełnić wszystkie pola');
      return;
    }

    this.facade.create(client);
    this.closeModal();
  }

  private isValidClient(client: typeof this.newClient): boolean {
    return !!(client.name && client.nip && client.email && client.phone && client.address);
  }

  viewClientDetails(client: Client): void {
    this.selectedClient.set(client);
    this.showViewModal.set(true);
  }

  closeViewModal(): void {
    this.showViewModal.set(false);
    this.selectedClient.set(null);
  }

  createInvoiceForClient(client: Client): void {
    this.invoiceState.createInvoiceForClient(client.name);
  }
}

