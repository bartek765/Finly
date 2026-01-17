import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LayoutDashboard, FileText, Receipt, Users, BarChart3 } from 'lucide-angular';

interface Tab {
  id: string;
  label: string;
  route: string;
  icon: any;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, LucideAngularModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly LayoutDashboard = LayoutDashboard;
  readonly FileText = FileText;
  readonly Receipt = Receipt;
  readonly Users = Users;
  readonly BarChart3 = BarChart3;

  tabs: Tab[] = [
    { id: 'dashboard', label: 'Dashboard', route: '/dashboard', icon: LayoutDashboard },
    { id: 'invoices', label: 'Faktury', route: '/invoices', icon: FileText },
    { id: 'expenses', label: 'Wydatki', route: '/expenses', icon: Receipt },
    { id: 'clients', label: 'Klienci', route: '/clients', icon: Users },
    { id: 'reports', label: 'Raporty', route: '/reports', icon: BarChart3 },
  ];
}
