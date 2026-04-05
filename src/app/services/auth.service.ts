import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { PlanTier } from '../models/dashboard.models';
import { PlatformApiService } from './platform-api.service';
import { AUTH_SESSION_STORAGE_KEY, AUTH_TOKEN_STORAGE_KEY } from './auth-storage.constants';

type AuthRole = 'admin' | 'user';

export interface AuthSession {
  userId: string;
  name: string;
  email: string;
  role: AuthRole;
}

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  location: string;
  plan: PlanTier;
}

interface AuthResult {
  ok: boolean;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = inject(PlatformApiService);

  private readonly token = signal<string | null>(localStorage.getItem(AUTH_TOKEN_STORAGE_KEY));
  private readonly session = signal<AuthSession | null>(this.readSession());

  readonly currentSession = computed(() => this.session());
  readonly isAuthenticated = computed(() => Boolean(this.token() && this.session()));
  readonly isAdmin = computed(() => this.session()?.role === 'admin');

  async login(email: string, password: string): Promise<AuthResult> {
    try {
      const response = await firstValueFrom(this.api.login({ email, password }));
      this.persistAuth(response.token, {
        userId: response.user.userId,
        name: response.user.name,
        email: response.user.email,
        role: this.normalizeRole(response.user.role)
      });
      return { ok: true };
    } catch (error) {
      return { ok: false, message: this.extractErrorMessage(error, 'No se pudo iniciar sesion.') };
    }
  }

  async register(input: RegisterInput): Promise<AuthResult> {
    try {
      const response = await firstValueFrom(
        this.api.register({
          name: input.name,
          email: input.email,
          password: input.password,
          location: input.location,
          plan: input.plan
        })
      );

      this.persistAuth(response.token, {
        userId: response.user.userId,
        name: response.user.name,
        email: response.user.email,
        role: this.normalizeRole(response.user.role)
      });

      return { ok: true };
    } catch (error) {
      return { ok: false, message: this.extractErrorMessage(error, 'No fue posible crear la cuenta.') };
    }
  }

  logout(): void {
    this.token.set(null);
    this.session.set(null);
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
  }

  defaultRoute(): string {
    return this.isAdmin() ? '/admin' : '/usuarios';
  }

  private persistAuth(token: string, session: AuthSession): void {
    this.token.set(token);
    this.session.set(session);
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
    localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(session));
  }

  private readSession(): AuthSession | null {
    const rawSession = localStorage.getItem(AUTH_SESSION_STORAGE_KEY);
    if (!rawSession) {
      return null;
    }

    try {
      const parsed = JSON.parse(rawSession) as AuthSession;
      if (!parsed?.userId || !parsed?.email || !parsed?.role) {
        return null;
      }

      return {
        ...parsed,
        role: this.normalizeRole(parsed.role)
      };
    } catch {
      return null;
    }
  }

  private normalizeRole(role: string): AuthRole {
    return role.toLowerCase() === 'admin' ? 'admin' : 'user';
  }

  private extractErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof HttpErrorResponse) {
      const payload = error.error as { message?: string } | null;
      return payload?.message ?? fallback;
    }

    return fallback;
  }
}
