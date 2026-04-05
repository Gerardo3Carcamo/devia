export type PlanTier = 'Starter' | 'Growth' | 'Scale';

export type UserStatus = 'Activo' | 'Prueba' | 'Inactivo';

export type AppStatus = 'Produccion' | 'Beta' | 'Mantenimiento' | 'Archivada';

export type DeploymentStatus = 'Exitoso' | 'Fallido' | 'En cola';

export type DeploymentEnvironment = 'Produccion' | 'Staging';

export type SubscriptionStatus = 'Activa' | 'Trial' | 'Cancelada';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  location: string;
  plan: PlanTier;
  status: UserStatus;
  joinedAt: string;
  avatarInitial: string;
}

export interface UserApp {
  id: string;
  userId: string;
  name: string;
  type: string;
  status: AppStatus;
  createdAt: string;
  lastUpdate: string;
}

export interface DeploymentRecord {
  id: string;
  userId: string;
  appId: string;
  environment: DeploymentEnvironment;
  status: DeploymentStatus;
  timestamp: string;
  durationSeconds: number;
}

export interface SubscriptionRecord {
  id: string;
  userId: string;
  plan: PlanTier;
  priceMonthly: number;
  startedAt: string;
  status: SubscriptionStatus;
}

export interface AdminOverview {
  totalUsers: number;
  activeUsers: number;
  totalApps: number;
  activeApps: number;
  deploymentsThisMonth: number;
  monthlyRevenue: number;
}

export interface RevenueByPlan {
  plan: PlanTier;
  revenue: number;
  share: number;
}

export interface UserPerformanceRow {
  userId: string;
  name: string;
  plan: PlanTier;
  status: UserStatus;
  apps: number;
  deployments: number;
  successRate: number;
  monthlyRevenue: number;
}
