import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../services/mock-data.service';
import { DeploymentRecord, SubscriptionRecord, UserApp, UserProfile } from '../../models/dashboard.models';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {
  private readonly dataService = inject(MockDataService);
  readonly users = this.dataService.getUsers();

  readonly selectedUserId = signal(this.users[0]?.id ?? '');

  readonly selectedUser = computed<UserProfile | undefined>(() =>
    this.dataService.getUserById(this.selectedUserId())
  );

  readonly userApps = computed<UserApp[]>(() => this.dataService.getAppsByUser(this.selectedUserId()));
  readonly userDeployments = computed<DeploymentRecord[]>(() =>
    this.dataService.getDeploymentsByUser(this.selectedUserId())
  );
  readonly userSubscriptions = computed<SubscriptionRecord[]>(() =>
    this.dataService.getSubscriptionsByUser(this.selectedUserId())
  );
  readonly monthlyRevenue = computed(() => this.dataService.getUserMonthlyRevenue(this.selectedUserId()));
  readonly successRate = computed(() => this.dataService.getDeploymentSuccessRate(this.selectedUserId()));

  onUserChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedUserId.set(select.value);
  }

  appById(appId: string): UserApp | undefined {
    return this.userApps().find((app) => app.id === appId);
  }
}
