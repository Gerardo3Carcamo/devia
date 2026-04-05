import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AppStatus } from '../../models/dashboard.models';
import { AuthService } from '../../services/auth.service';
import { PlatformApiService } from '../../services/platform-api.service';

@Component({
  selector: 'app-create-app',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create-app.component.html',
  styleUrl: './create-app.component.scss'
})
export class CreateAppComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly api = inject(PlatformApiService);

  readonly isAdmin = this.authService.isAdmin;
  readonly isCreating = signal(false);
  readonly createErrorMessage = signal<string | null>(null);
  readonly createSuccessMessage = signal<string | null>(null);
  readonly appStatusOptions: AppStatus[] = ['Beta', 'Produccion', 'Mantenimiento'];
  readonly promptTemplates = [
    'Quiero autenticacion con roles de usuario y admin.',
    'Necesito dashboard con metricas de ventas y exportacion CSV.',
    'Agrega onboarding de 3 pasos y notificaciones por correo.'
  ];

  readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    type: ['', [Validators.required, Validators.minLength(2)]],
    status: ['Beta' as AppStatus, [Validators.required]],
    customizationPrompt: ['', [Validators.maxLength(1200)]]
  });

  get customizationLength(): number {
    return this.form.controls.customizationPrompt.getRawValue().length;
  }

  useTemplate(template: string): void {
    const current = this.form.controls.customizationPrompt.getRawValue().trim();
    const nextValue = current ? `${current}\n• ${template}` : `• ${template}`;
    this.form.controls.customizationPrompt.setValue(nextValue);
  }

  async submit(): Promise<void> {
    if (this.isAdmin()) {
      this.createErrorMessage.set('Los administradores no crean apps desde esta vista.');
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isCreating.set(true);
    this.createErrorMessage.set(null);
    this.createSuccessMessage.set(null);

    try {
      const value = this.form.getRawValue();
      const customizationPrompt = value.customizationPrompt.trim();
      await firstValueFrom(
        this.api.createApp({
          name: value.name.trim(),
          type: value.type.trim(),
          status: value.status,
          customizationPrompt: customizationPrompt.length > 0 ? customizationPrompt : undefined
        })
      );

      this.form.reset({
        name: '',
        type: '',
        status: 'Beta',
        customizationPrompt: ''
      });
      this.createSuccessMessage.set('App creada correctamente. Ya aparece en tu dashboard.');
    } catch {
      this.createErrorMessage.set('No se pudo crear la app.');
    } finally {
      this.isCreating.set(false);
    }
  }
}
