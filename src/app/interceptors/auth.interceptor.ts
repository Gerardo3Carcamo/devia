import { HttpInterceptorFn } from '@angular/common/http';
import { AUTH_TOKEN_STORAGE_KEY } from '../services/auth-storage.constants';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

  if (!token) {
    return next(request);
  }

  const authorizedRequest = request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authorizedRequest);
};
