import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';
import {
  AdminOverview,
  AppStatus,
  DeploymentRecord,
  RevenueByPlan,
  SubscriptionRecord,
  UserDashboardData,
  UserPerformanceRow,
  UserProfile
} from '../models/dashboard.models';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  location: string;
  plan: 'Starter' | 'Growth' | 'Scale';
}

export interface CreateAppPayload {
  name: string;
  type: string;
  status: AppStatus;
  customizationPrompt?: string;
}

export interface AuthApiResponse {
  token: string;
  expiresAtUtc: string;
  user: {
    userId: string;
    name: string;
    email: string;
    role: string;
  };
}

@Injectable({ providedIn: 'root' })
export class PlatformApiService {
  constructor(
    private readonly http: HttpClient,
    @Inject(API_BASE_URL) private readonly apiBaseUrl: string
  ) {}

  login(payload: LoginPayload): Observable<AuthApiResponse> {
    return this.http.post<AuthApiResponse>(`${this.apiBaseUrl}/auth/login`, payload);
  }

  register(payload: RegisterPayload): Observable<AuthApiResponse> {
    return this.http.post<AuthApiResponse>(`${this.apiBaseUrl}/auth/register`, payload);
  }

  getCurrentSession(): Observable<AuthApiResponse['user']> {
    return this.http.get<AuthApiResponse['user']>(`${this.apiBaseUrl}/auth/me`);
  }

  getUsers(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(`${this.apiBaseUrl}/users`);
  }

  getMyDashboard(): Observable<UserDashboardData> {
    return this.http.get<UserDashboardData>(`${this.apiBaseUrl}/dashboard/me`);
  }

  getUserDashboard(userId: string): Observable<UserDashboardData> {
    return this.http.get<UserDashboardData>(`${this.apiBaseUrl}/dashboard/users/${userId}`);
  }

  getAdminOverview(): Observable<AdminOverview> {
    return this.http.get<AdminOverview>(`${this.apiBaseUrl}/dashboard/admin/overview`);
  }

  getRevenueByPlan(): Observable<RevenueByPlan[]> {
    return this.http.get<RevenueByPlan[]>(`${this.apiBaseUrl}/dashboard/admin/revenue-by-plan`);
  }

  getUserPerformance(): Observable<UserPerformanceRow[]> {
    return this.http.get<UserPerformanceRow[]>(`${this.apiBaseUrl}/dashboard/admin/user-performance`);
  }

  getRecentDeployments(limit = 8): Observable<DeploymentRecord[]> {
    return this.http.get<DeploymentRecord[]>(`${this.apiBaseUrl}/dashboard/admin/recent-deployments?limit=${limit}`);
  }

  getUserSubscriptions(userId: string): Observable<SubscriptionRecord[]> {
    return this.http.get<SubscriptionRecord[]>(`${this.apiBaseUrl}/users/${userId}/subscriptions`);
  }

  createApp(payload: CreateAppPayload): Observable<void> {
    return this.http.post<void>(`${this.apiBaseUrl}/apps`, payload);
  }
}
