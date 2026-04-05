import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { PlatformApiService } from '../../services/platform-api.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss'
})
export class AppShellComponent implements OnInit {
  private readonly api = inject(PlatformApiService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly session = this.authService.currentSession;
  readonly isAdmin = this.authService.isAdmin;
  readonly primaryMetricLabel = signal('Cargando...');
  readonly primaryMetricValue = signal('--');
  readonly secondaryMetricLabel = signal('Cargando...');
  readonly secondaryMetricValue = signal('--');

  async ngOnInit(): Promise<void> {
    await this.loadMetrics();
  }

  private async loadMetrics(): Promise<void> {
    try {
      if (this.isAdmin()) {
        const overview = await firstValueFrom(this.api.getAdminOverview());
        this.primaryMetricLabel.set('Usuarios activos');
        this.primaryMetricValue.set(`${overview.activeUsers}/${overview.totalUsers}`);
        this.secondaryMetricLabel.set('Ingreso mensual');
        this.secondaryMetricValue.set(
          new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          }).format(overview.monthlyRevenue)
        );
        return;
      }

      const dashboard = await firstValueFrom(this.api.getMyDashboard());
      this.primaryMetricLabel.set('Apps registradas');
      this.primaryMetricValue.set(`${dashboard.apps.length}`);
      this.secondaryMetricLabel.set('Ingreso mensual');
      this.secondaryMetricValue.set(
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(dashboard.monthlyRevenue)
      );
    } catch {
      this.primaryMetricLabel.set('Sin datos');
      this.primaryMetricValue.set('--');
      this.secondaryMetricLabel.set('Sin datos');
      this.secondaryMetricValue.set('--');
    }
  }

  logout(): void {
    this.authService.logout();
    void this.router.navigateByUrl('/login');
  }
}
