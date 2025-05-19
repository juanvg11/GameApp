import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {  Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';


@Component({
  selector: 'app-login-page',
  imports: [ RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {

  fb = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);
  router = inject(Router)

  AuthService = inject(AuthService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    const { email = '', password = '' } = this.loginForm.value;

    this.AuthService.login(email!, password!)
    .subscribe((isAuthenticated) => {
      /* Fernando dejaba esta linea de codigo aqui, y si el login era incorrecto se accedia al home pero sin estar registrado.
      De esta manera el usuario no se entera bien de que el login ha sido erroneo
      Ahora se manda un mensaje de error si no ha sido autenticado correctamente*/
      //this.router.navigateByUrl('/');
      if (isAuthenticated) {
        this.router.navigateByUrl('/');
        console.log('Usuario loggeado');
        return
      }

      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);

    })


}
}
