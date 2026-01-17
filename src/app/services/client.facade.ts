import {inject, Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {Client} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ClientFacade {
  private storage = inject(StorageService);

  get clients() {
    return this.storage.clients;
  }

  create(client: Omit<Client, 'id'>): void {
    this.storage.addClient(client);
  }

  update(id: string, client: Partial<Client>): void {
    this.storage.updateClient(id, client);
  }

  remove(id: string): void {
    this.storage.deleteClient(id);
  }
}

