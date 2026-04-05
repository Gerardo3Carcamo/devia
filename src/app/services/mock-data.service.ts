import { Injectable } from '@angular/core';
import {
  AdminOverview,
  DeploymentRecord,
  RevenueByPlan,
  SubscriptionRecord,
  UserApp,
  UserPerformanceRow,
  UserProfile
} from '../models/dashboard.models';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  private readonly users: UserProfile[] = [
    {
      id: 'u1',
      name: 'Camila Ortega',
      email: 'camila@builderlabs.com',
      role: 'Founder',
      location: 'Monterrey, MX',
      plan: 'Scale',
      status: 'Activo',
      joinedAt: '2025-11-18',
      avatarInitial: 'C'
    },
    {
      id: 'u2',
      name: 'Diego Mendez',
      email: 'diego@orbitapps.io',
      role: 'Product Manager',
      location: 'CDMX, MX',
      plan: 'Growth',
      status: 'Activo',
      joinedAt: '2026-01-12',
      avatarInitial: 'D'
    },
    {
      id: 'u3',
      name: 'Valeria Ramos',
      email: 'valeria@clinicflow.dev',
      role: 'Operations Lead',
      location: 'Guadalajara, MX',
      plan: 'Starter',
      status: 'Prueba',
      joinedAt: '2026-02-09',
      avatarInitial: 'V'
    },
    {
      id: 'u4',
      name: 'Sebastian Gil',
      email: 'sebastian@legacysoft.mx',
      role: 'CTO',
      location: 'Bogota, CO',
      plan: 'Growth',
      status: 'Inactivo',
      joinedAt: '2025-10-01',
      avatarInitial: 'S'
    }
  ];

  private readonly apps: UserApp[] = [
    {
      id: 'a1',
      userId: 'u1',
      name: 'Booking Pulse',
      type: 'Reservas + pagos',
      status: 'Produccion',
      createdAt: '2026-02-02',
      lastUpdate: '2026-04-04'
    },
    {
      id: 'a2',
      userId: 'u1',
      name: 'Store Beacon',
      type: 'Inventario omnicanal',
      status: 'Beta',
      createdAt: '2026-01-19',
      lastUpdate: '2026-04-03'
    },
    {
      id: 'a3',
      userId: 'u1',
      name: 'Sales Orbit',
      type: 'Dashboard comercial',
      status: 'Produccion',
      createdAt: '2025-12-11',
      lastUpdate: '2026-04-01'
    },
    {
      id: 'a4',
      userId: 'u2',
      name: 'Workforce Grid',
      type: 'Gestion de turnos',
      status: 'Produccion',
      createdAt: '2026-01-27',
      lastUpdate: '2026-04-05'
    },
    {
      id: 'a5',
      userId: 'u2',
      name: 'Event Horizon',
      type: 'Eventos y tickets',
      status: 'Mantenimiento',
      createdAt: '2026-02-16',
      lastUpdate: '2026-04-02'
    },
    {
      id: 'a6',
      userId: 'u3',
      name: 'Clinic Flow',
      type: 'Agenda medica',
      status: 'Beta',
      createdAt: '2026-02-12',
      lastUpdate: '2026-04-04'
    },
    {
      id: 'a7',
      userId: 'u4',
      name: 'Legacy Forms',
      type: 'Flujos internos',
      status: 'Archivada',
      createdAt: '2025-11-08',
      lastUpdate: '2026-03-22'
    }
  ];

  private readonly deployments: DeploymentRecord[] = [
    {
      id: 'd1',
      userId: 'u1',
      appId: 'a1',
      environment: 'Produccion',
      status: 'Exitoso',
      timestamp: '2026-04-05T10:12:00',
      durationSeconds: 78
    },
    {
      id: 'd2',
      userId: 'u1',
      appId: 'a2',
      environment: 'Staging',
      status: 'Exitoso',
      timestamp: '2026-04-05T08:45:00',
      durationSeconds: 64
    },
    {
      id: 'd3',
      userId: 'u1',
      appId: 'a3',
      environment: 'Produccion',
      status: 'Fallido',
      timestamp: '2026-04-03T21:10:00',
      durationSeconds: 123
    },
    {
      id: 'd4',
      userId: 'u2',
      appId: 'a4',
      environment: 'Produccion',
      status: 'Exitoso',
      timestamp: '2026-04-04T14:36:00',
      durationSeconds: 80
    },
    {
      id: 'd5',
      userId: 'u2',
      appId: 'a5',
      environment: 'Staging',
      status: 'Exitoso',
      timestamp: '2026-04-02T11:22:00',
      durationSeconds: 59
    },
    {
      id: 'd6',
      userId: 'u3',
      appId: 'a6',
      environment: 'Staging',
      status: 'En cola',
      timestamp: '2026-04-05T11:06:00',
      durationSeconds: 0
    },
    {
      id: 'd7',
      userId: 'u3',
      appId: 'a6',
      environment: 'Staging',
      status: 'Exitoso',
      timestamp: '2026-04-04T17:52:00',
      durationSeconds: 88
    },
    {
      id: 'd8',
      userId: 'u4',
      appId: 'a7',
      environment: 'Produccion',
      status: 'Fallido',
      timestamp: '2026-03-30T09:15:00',
      durationSeconds: 140
    },
    {
      id: 'd9',
      userId: 'u2',
      appId: 'a4',
      environment: 'Produccion',
      status: 'Exitoso',
      timestamp: '2026-04-01T06:42:00',
      durationSeconds: 74
    }
  ];

  private readonly subscriptions: SubscriptionRecord[] = [
    {
      id: 's1',
      userId: 'u1',
      plan: 'Scale',
      priceMonthly: 399,
      startedAt: '2025-11-18',
      status: 'Activa'
    },
    {
      id: 's2',
      userId: 'u2',
      plan: 'Growth',
      priceMonthly: 199,
      startedAt: '2026-01-12',
      status: 'Activa'
    },
    {
      id: 's3',
      userId: 'u3',
      plan: 'Starter',
      priceMonthly: 49,
      startedAt: '2026-02-09',
      status: 'Trial'
    },
    {
      id: 's4',
      userId: 'u4',
      plan: 'Growth',
      priceMonthly: 199,
      startedAt: '2025-10-01',
      status: 'Cancelada'
    }
  ];

  getUsers(): UserProfile[] {
    return this.users;
  }

  getUserById(userId: string): UserProfile | undefined {
    return this.users.find((user) => user.id === userId);
  }

  getAppsByUser(userId: string): UserApp[] {
    return this.apps
      .filter((app) => app.userId === userId)
      .sort((a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime());
  }

  getDeploymentsByUser(userId: string): DeploymentRecord[] {
    return this.deployments
      .filter((deployment) => deployment.userId === userId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  getSubscriptionsByUser(userId: string): SubscriptionRecord[] {
    return this.subscriptions
      .filter((subscription) => subscription.userId === userId)
      .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
  }

  getAppName(appId: string): string {
    return this.apps.find((app) => app.id === appId)?.name ?? 'App sin nombre';
  }

  getUserMonthlyRevenue(userId: string): number {
    return this.getSubscriptionsByUser(userId)
      .filter((subscription) => subscription.status !== 'Cancelada')
      .reduce((total, subscription) => total + subscription.priceMonthly, 0);
  }

  getDeploymentSuccessRate(userId: string): number {
    const userDeployments = this.getDeploymentsByUser(userId);

    if (userDeployments.length === 0) {
      return 0;
    }

    const successfulDeployments = userDeployments.filter((deployment) => deployment.status === 'Exitoso').length;
    return successfulDeployments / userDeployments.length;
  }

  getAdminOverview(): AdminOverview {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const deploymentsThisMonth = this.deployments.filter((deployment) => {
      const deploymentDate = new Date(deployment.timestamp);
      return deploymentDate.getMonth() === currentMonth && deploymentDate.getFullYear() === currentYear;
    }).length;

    return {
      totalUsers: this.users.length,
      activeUsers: this.users.filter((user) => user.status === 'Activo').length,
      totalApps: this.apps.length,
      activeApps: this.apps.filter((app) => app.status !== 'Archivada').length,
      deploymentsThisMonth,
      monthlyRevenue: this.subscriptions
        .filter((subscription) => subscription.status !== 'Cancelada')
        .reduce((total, subscription) => total + subscription.priceMonthly, 0)
    };
  }

  getRevenueByPlan(): RevenueByPlan[] {
    const plans = ['Starter', 'Growth', 'Scale'] as const;
    const totals = plans.map((plan) => {
      const revenue = this.subscriptions
        .filter((subscription) => subscription.plan === plan && subscription.status !== 'Cancelada')
        .reduce((total, subscription) => total + subscription.priceMonthly, 0);

      return {
        plan,
        revenue
      };
    });

    const grandTotal = totals.reduce((total, item) => total + item.revenue, 0);

    return totals.map((item) => ({
      plan: item.plan,
      revenue: item.revenue,
      share: grandTotal > 0 ? item.revenue / grandTotal : 0
    }));
  }

  getUserPerformance(): UserPerformanceRow[] {
    return this.users
      .map((user) => {
        const userApps = this.getAppsByUser(user.id);
        const userDeployments = this.getDeploymentsByUser(user.id);
        const monthlyRevenue = this.getUserMonthlyRevenue(user.id);

        return {
          userId: user.id,
          name: user.name,
          plan: user.plan,
          status: user.status,
          apps: userApps.length,
          deployments: userDeployments.length,
          successRate: this.getDeploymentSuccessRate(user.id),
          monthlyRevenue
        };
      })
      .sort((a, b) => b.monthlyRevenue - a.monthlyRevenue);
  }

  getRecentDeployments(limit = 8): DeploymentRecord[] {
    return [...this.deployments]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }
}
