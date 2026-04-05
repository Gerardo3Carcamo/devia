import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  private readonly dataService = inject(MockDataService);

  readonly overview = computed(() => this.dataService.getAdminOverview());
  readonly revenueByPlan = computed(() => this.dataService.getRevenueByPlan());
  readonly performanceRows = computed(() => this.dataService.getUserPerformance());
  readonly recentDeployments = computed(() => this.dataService.getRecentDeployments());

  userName(userId: string): string {
    return this.dataService.getUserById(userId)?.name ?? 'Usuario';
  }

  appName(appId: string): string {
    return this.dataService.getAppName(appId);
  }
}
