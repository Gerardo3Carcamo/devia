import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PlanTier } from '../../models/dashboard.models';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly planOptions: Array<{ plan: PlanTier; price: number }> = [
    { plan: 'Starter', price: 49 },
    { plan: 'Growth', price: 199 },
    { plan: 'Scale', price: 399 }
  ];

  readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    location: ['', [Validators.required, Validators.minLength(2)]],
    plan: ['Starter' as PlanTier, [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]]
  });

  readonly errorMessage = signal<string | null>(null);
  readonly isSubmitting = signal(false);

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const rawValue = this.form.getRawValue();
    if (rawValue.password !== rawValue.confirmPassword) {
      this.errorMessage.set('Las contrasenas no coinciden.');
      return;
    }

    this.errorMessage.set(null);
    this.isSubmitting.set(true);

    const result = await this.authService.register({
      name: rawValue.name,
      location: rawValue.location,
      plan: rawValue.plan,
      email: rawValue.email,
      password: rawValue.password
    });

    this.isSubmitting.set(false);

    if (!result.ok) {
      this.errorMessage.set(result.message ?? 'No fue posible crear la cuenta.');
      return;
    }

    void this.router.navigateByUrl(this.authService.defaultRoute());
  }
}
