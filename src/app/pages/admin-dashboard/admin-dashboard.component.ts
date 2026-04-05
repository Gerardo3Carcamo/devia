import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { AdminOverview, DeploymentRecord, RevenueByPlan, UserPerformanceRow } from '../../models/dashboard.models';
import { PlatformApiService } from '../../services/platform-api.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  private readonly api = inject(PlatformApiService);

  readonly isLoading = signal(true);
  readonly errorMessage = signal<string | null>(null);

  readonly overview = signal<AdminOverview>({
    totalUsers: 0,
    activeUsers: 0,
    totalApps: 0,
    activeApps: 0,
    deploymentsThisMonth: 0,
    monthlyRevenue: 0
  });

  readonly revenueByPlan = signal<RevenueByPlan[]>([]);
  readonly performanceRows = signal<UserPerformanceRow[]>([]);
  readonly recentDeployments = signal<DeploymentRecord[]>([]);

  async ngOnInit(): Promise<void> {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      const [overview, revenueByPlan, performanceRows, recentDeployments] = await Promise.all([
        firstValueFrom(this.api.getAdminOverview()),
        firstValueFrom(this.api.getRevenueByPlan()),
        firstValueFrom(this.api.getUserPerformance()),
        firstValueFrom(this.api.getRecentDeployments(8))
      ]);

      this.overview.set(overview);
      this.revenueByPlan.set(revenueByPlan);
      this.performanceRows.set(performanceRows);
      this.recentDeployments.set(recentDeployments);
    } catch {
      this.errorMessage.set('No se pudieron cargar las metricas administrativas.');
    } finally {
      this.isLoading.set(false);
    }
  }

  deploymentStatusLabel(status: DeploymentRecord['status']): string {
    return status === 'EnCola' ? 'En cola' : status;
  }

  userName(userId: string): string {
    return this.performanceRows().find((row) => row.userId === userId)?.name ?? userId;
  }
}
