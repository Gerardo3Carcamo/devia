import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import {
  DeploymentRecord,
  SubscriptionRecord,
  UserApp,
  UserDashboardData,
  UserProfile
} from '../../models/dashboard.models';
import { AuthService } from '../../services/auth.service';
import { PlatformApiService } from '../../services/platform-api.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent implements OnInit {
  private readonly api = inject(PlatformApiService);
  private readonly authService = inject(AuthService);

  readonly isAdmin = this.authService.isAdmin;
  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly users = signal<UserProfile[]>([]);
  readonly selectedUserId = signal<string>('');
  readonly dashboard = signal<UserDashboardData | null>(null);

  readonly selectedUser = computed<UserProfile | undefined>(() => this.dashboard()?.profile);
  readonly userApps = computed<UserApp[]>(() => this.dashboard()?.apps ?? []);
  readonly userDeployments = computed<DeploymentRecord[]>(() => this.dashboard()?.deployments ?? []);
  readonly userSubscriptions = computed<SubscriptionRecord[]>(() => this.dashboard()?.subscriptions ?? []);
  readonly monthlyRevenue = computed(() => this.dashboard()?.monthlyRevenue ?? 0);
  readonly successRate = computed(() => this.dashboard()?.successRate ?? 0);

  async ngOnInit(): Promise<void> {
    if (this.isAdmin()) {
      await this.loadAdminData();
      return;
    }

    await this.loadMyDashboard();
  }

  async onUserChange(event: Event): Promise<void> {
    if (!this.isAdmin()) {
      return;
    }

    const select = event.target as HTMLSelectElement;
    const userId = select.value;
    this.selectedUserId.set(userId);
    await this.loadDashboardByUserId(userId);
  }

  deploymentStatusLabel(status: DeploymentRecord['status']): string {
    return status === 'EnCola' ? 'En cola' : status;
  }

  private async loadAdminData(): Promise<void> {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      const users = await firstValueFrom(this.api.getUsers());
      this.users.set(users);

      if (users.length === 0) {
        this.dashboard.set(null);
        this.selectedUserId.set('');
        return;
      }

      const userId = users[0].id;
      this.selectedUserId.set(userId);
      await this.loadDashboardByUserId(userId);
    } catch {
      this.errorMessage.set('No se pudieron cargar los usuarios.');
    } finally {
      this.isLoading.set(false);
    }
  }

  private async loadMyDashboard(): Promise<void> {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      const dashboard = await firstValueFrom(this.api.getMyDashboard());
      this.dashboard.set(dashboard);
      this.selectedUserId.set(dashboard.profile.id);
    } catch {
      this.errorMessage.set('No se pudo cargar tu dashboard.');
    } finally {
      this.isLoading.set(false);
    }
  }

  private async loadDashboardByUserId(userId: string): Promise<void> {
    if (!userId) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      const dashboard = await firstValueFrom(this.api.getUserDashboard(userId));
      this.dashboard.set(dashboard);
    } catch {
      this.errorMessage.set('No se pudo cargar el dashboard del usuario seleccionado.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
