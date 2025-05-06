

import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { A } from 'node_modules/@angular/core/weak_ref.d-DOjz-6fK';
import { first, firstValueFrom } from 'rxjs';

export const IsAdminGuard: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {

  const authService = inject(AuthService);

  await firstValueFrom(authService.checkStatus());
  return authService.isAdmin();
}
