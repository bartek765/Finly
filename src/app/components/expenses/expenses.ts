import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Calendar, X } from 'lucide-angular';
import { ExpenseFacade } from '../../services/expense.facade';

@Component({
  selector: 'app-expenses',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './expenses.html',
  styleUrl: './expenses.scss'
})
export class ExpensesComponent {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Calendar = Calendar;
  readonly X = X;

  private facade = inject(ExpenseFacade);

  searchQuery = signal('');
  selectedCategory = signal('all');
  showModal = signal(false);

  newExpense = {
    description: '',
    category: 'Software',
    amount: 0,
    date: '',
    vendor: '',
    paymentMethod: 'Przelew'
  };

  expenses = this.facade.expenses;

  categories = ['all', 'Software', 'Rent', 'Supplies', 'Training', 'Services', 'Utilities', 'Transport', 'Insurance'];

  filteredExpenses = computed(() => {
    return this.expenses().filter((expense) => {
      const matchesSearch = expense.description.toLowerCase().includes(this.searchQuery().toLowerCase()) ||
                           expense.vendor.toLowerCase().includes(this.searchQuery().toLowerCase());
      const matchesCategory = this.selectedCategory() === 'all' || expense.category === this.selectedCategory();
      return matchesSearch && matchesCategory;
    });
  });

  totalExpenses = computed(() =>
    this.filteredExpenses().reduce((sum, exp) => sum + exp.amount, 0)
  );

  categoryTotals = computed(() => {
    return this.expenses().reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);
  });

  topCategories = computed(() => {
    return Object.entries(this.categoryTotals())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);
  });

  totalAllExpenses = computed(() =>
    this.expenses().reduce((s, e) => s + e.amount, 0)
  );

  formatNumber(num: number): string {
    return num.toLocaleString('pl-PL');
  }

  getCategoryPercentage(amount: number): string {
    return ((amount / this.totalAllExpenses()) * 100).toFixed(1);
  }

  getCategoryLabel(category: string): string {
    return category === 'all' ? 'Wszystkie kategorie' : category;
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
    const today = new Date().toISOString().split('T')[0];
    this.newExpense = {
      description: '',
      category: 'Software',
      amount: 0,
      date: today,
      vendor: '',
      paymentMethod: 'Przelew'
    };
  }

  submitExpense(): void {
    const expense = this.newExpense;

    if (!this.isValidExpense(expense)) {
      alert('Proszę wypełnić wszystkie pola');
      return;
    }

    this.facade.create(expense);
    this.closeModal();
  }

  private isValidExpense(expense: typeof this.newExpense): boolean {
    return !!(expense.description && expense.vendor && expense.date && expense.amount > 0);
  }
}

