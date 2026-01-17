import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, TrendingUp, TrendingDown, FileText, Receipt, Users, AlertCircle } from 'lucide-angular';

interface Stat {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: any;
  color: string;
}

interface Invoice {
  id: string;
  client: string;
  amount: string;
  status: 'paid' | 'pending' | 'overdue';
  date: string;
}

interface Task {
  title: string;
  deadline: string;
  priority: 'high' | 'medium';
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent {
  readonly TrendingUp = TrendingUp;
  readonly TrendingDown = TrendingDown;
  readonly FileText = FileText;
  readonly Receipt = Receipt;
  readonly Users = Users;
  readonly AlertCircle = AlertCircle;

  stats: Stat[] = [
    {
      label: 'Przychody (grudzień)',
      value: '125 430 zł',
      change: '+12.5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-green-50 text-green-600',
    },
    {
      label: 'Wydatki (grudzień)',
      value: '48 920 zł',
      change: '-8.3%',
      trend: 'down',
      icon: TrendingDown,
      color: 'bg-red-50 text-red-600',
    },
    {
      label: 'Nieopłacone faktury',
      value: '23',
      change: '67 890 zł',
      trend: 'neutral',
      icon: FileText,
      color: 'bg-orange-50 text-orange-600',
    },
    {
      label: 'Aktywni klienci',
      value: '48',
      change: '+5 w tym miesiącu',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-50 text-blue-600',
    },
  ];

  recentInvoices: Invoice[] = [
    { id: 'FV/12/2024/089', client: 'ABC Sp. z o.o.', amount: '12 500 zł', status: 'paid', date: '2024-12-08' },
    { id: 'FV/12/2024/088', client: 'XYZ S.A.', amount: '8 450 zł', status: 'pending', date: '2024-12-07' },
    { id: 'FV/12/2024/087', client: 'Tech Solutions', amount: '15 230 zł', status: 'overdue', date: '2024-11-28' },
    { id: 'FV/12/2024/086', client: 'Marketing Pro', amount: '6 780 zł', status: 'paid', date: '2024-12-05' },
  ];

  upcomingTasks: Task[] = [
    { title: 'Deklaracja VAT-7 - grudzień', deadline: '2024-12-25', priority: 'high' },
    { title: 'Rozliczenie ZUS - listopad', deadline: '2024-12-20', priority: 'high' },
    { title: 'Faktury do zapłaty - ABC Sp. z o.o.', deadline: '2024-12-15', priority: 'medium' },
    { title: 'Raport miesięczny dla zarządu', deadline: '2024-12-28', priority: 'medium' },
  ];

  getStatusLabel(status: string): string {
    switch (status) {
      case 'paid': return 'Opłacona';
      case 'pending': return 'Oczekująca';
      case 'overdue': return 'Przeterminowana';
      default: return status;
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      default: return '';
    }
  }

  getTrendClass(trend: string): string {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-slate-600';
    }
  }

  getPriorityLabel(priority: string): string {
    return priority === 'high' ? 'Pilne' : 'Średnie';
  }

  getPriorityClass(priority: string): string {
    return priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700';
  }
}
