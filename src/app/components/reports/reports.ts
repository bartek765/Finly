import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Download, Calendar } from 'lucide-angular';
import jsPDF from 'jspdf';

interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
}

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface ProfitData {
  month: string;
  profit: number;
}

@Component({
  selector: 'app-reports',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './reports.html',
  styleUrl: './reports.scss'
})
export class ReportsComponent {
  readonly Download = Download;
  readonly Calendar = Calendar;

  tooltipData = signal<{ x: number; y: number; content: string } | null>(null);

  monthlyData: MonthlyData[] = [
    { month: 'Lip', income: 98000, expenses: 42000 },
    { month: 'Sie', income: 112000, expenses: 45000 },
    { month: 'Wrz', income: 105000, expenses: 48000 },
    { month: 'Paz', income: 128000, expenses: 51000 },
    { month: 'Lis', income: 118000, expenses: 46000 },
    { month: 'Gru', income: 125000, expenses: 49000 },
  ];

  categoryData: CategoryData[] = [
    { name: 'Usługi IT', value: 45, color: '#3b82f6' },
    { name: 'Konsulting', value: 28, color: '#10b981' },
    { name: 'Marketing', value: 15, color: '#f59e0b' },
    { name: 'Projektowanie', value: 12, color: '#ef4444' },
  ];

  profitData: ProfitData[] = [
    { month: 'Lip', profit: 56000 },
    { month: 'Sie', profit: 67000 },
    { month: 'Wrz', profit: 57000 },
    { month: 'Paz', profit: 77000 },
    { month: 'Lis', profit: 72000 },
    { month: 'Gru', profit: 76000 },
  ];

  get totalIncome(): number {
    return this.monthlyData.reduce((sum, d) => sum + d.income, 0);
  }

  get totalExpenses(): number {
    return this.monthlyData.reduce((sum, d) => sum + d.expenses, 0);
  }

  get totalProfit(): number {
    return this.totalIncome - this.totalExpenses;
  }

  get profitMargin(): string {
    return ((this.totalProfit / this.totalIncome) * 100).toFixed(1);
  }

  formatNumber(num: number): string {
    return num.toLocaleString('pl-PL');
  }

  getBarHeight(value: number, maxValue: number): number {
    return (value / maxValue) * 100;
  }

  get maxMonthlyValue(): number {
    return Math.max(...this.monthlyData.map(d => Math.max(d.income, d.expenses)));
  }

  get maxProfitValue(): number {
    return Math.max(...this.profitData.map(d => d.profit));
  }

  showTooltip(event: MouseEvent, content: string): void {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    this.tooltipData.set({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
      content
    });
  }

  hideTooltip(): void {
    this.tooltipData.set(null);
  }

  exportToPDF(): void {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString('pl-PL');

    doc.setFontSize(20);
    doc.text('Raport Finansowy', 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.text(`Data wygenerowania: ${date}`, 105, 30, { align: 'center' });

    doc.setFontSize(14);
    doc.text('Podsumowanie (6 miesięcy)', 20, 45);

    doc.setFontSize(10);
    let y = 55;
    doc.text(`Przychody: ${this.formatNumber(this.totalIncome)} zł`, 20, y);
    y += 7;
    doc.text(`Wydatki: ${this.formatNumber(this.totalExpenses)} zł`, 20, y);
    y += 7;
    doc.text(`Zysk: ${this.formatNumber(this.totalProfit)} zł`, 20, y);
    y += 7;
    doc.text(`Marża zysku: ${this.profitMargin}%`, 20, y);

    y += 15;
    doc.setFontSize(14);
    doc.text('Przychody i wydatki miesięczne', 20, y);
    y += 10;

    doc.setFontSize(10);
    doc.text('Miesiąc', 20, y);
    doc.text('Przychody', 60, y);
    doc.text('Wydatki', 110, y);
    doc.text('Zysk', 160, y);
    y += 7;

    this.monthlyData.forEach(data => {
      const profit = data.income - data.expenses;
      doc.text(data.month, 20, y);
      doc.text(`${this.formatNumber(data.income)} zł`, 60, y);
      doc.text(`${this.formatNumber(data.expenses)} zł`, 110, y);
      doc.text(`${this.formatNumber(profit)} zł`, 160, y);
      y += 7;
    });

    y += 10;
    doc.setFontSize(14);
    doc.text('Przychody według kategorii', 20, y);
    y += 10;

    doc.setFontSize(10);
    this.categoryData.forEach(cat => {
      doc.text(`${cat.name}: ${cat.value}%`, 20, y);
      y += 7;
    });

    y += 10;
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(14);
    doc.text('Podsumowanie podatkowe', 20, y);
    y += 10;

    doc.setFontSize(10);
    doc.text('VAT należny: 28 809 zł', 20, y);
    y += 7;
    doc.text('VAT naliczony: 11 292 zł', 20, y);
    y += 7;
    doc.text('VAT do zapłaty: 17 517 zł', 20, y);

    doc.save(`raport-finansowy-${date}.pdf`);
  }
}
