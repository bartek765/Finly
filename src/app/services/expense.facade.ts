import {inject, Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {Expense} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ExpenseFacade {
  private storage = inject(StorageService);

  get expenses() {
    return this.storage.expenses;
  }

  create(expense: Omit<Expense, 'id'>): void {
    this.storage.addExpense(expense);
  }

  update(id: string, expense: Partial<Expense>): void {
    this.storage.updateExpense(id, expense);
  }

  remove(id: string): void {
    this.storage.deleteExpense(id);
  }
}

