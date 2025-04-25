import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  fb = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);
  router = inject(Router)

  AuthService = inject(AuthService);

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    name: ['', [Validators.required, Validators.minLength(3)]],
  });

  onSubmit() {
    if (this.registerForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    const { email = '', password = '', name = '' } = this.registerForm.value;



    this.AuthService.register(name!, email!, password!)
    .subscribe((isRegistered) => {
      //this.router.navigateByUrl('/');
      if (isRegistered) {
        this.router.navigateByUrl('/');
        console.log('Usuario registrado');
        return
      }
      console.log('Error al registrar el usuario');
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);

    })


}
}
