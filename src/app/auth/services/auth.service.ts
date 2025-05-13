import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { AuthResponse } from '@auth/interfaces/auth-response.interface';
import { User } from '@auth/interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environments } from 'src/environments/environments';


type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environments.baseUrl;

@Injectable({providedIn: 'root'})
export class AuthService {

  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));

  private http = inject(HttpClient);

  checkStatusResource = rxResource({
    loader: () => this.checkStatus(),
  });

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';
    if (this._user()) return 'authenticated';
    return 'not-authenticated';
  });

  /* Se utiliza computed signals para que desde el mundo exterior no se pueda modificar su valor
  , con senales normales se pueden modificar con el .set()
  Son similares a getters*/
  user = computed(() => this._user());
  token = computed(() => this._token());
  isAdmin = computed(() =>this._user()?.roles.includes('admin') ?? false);

  login( email: string, password: string): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${baseUrl}/auth/login`, {
      email: email,
       password: password
      }).pipe(
        tap(resp => console.log(resp.user.name)),
        tap(resp => console.log(resp.user.email)),
        tap(resp => console.log(resp.user.favorites)),
        tap(resp => console.log(resp.user._id)),
        tap(resp => console.log(resp.user.library)),
        tap(resp => console.log(resp.user.roles)),
        tap(resp => console.log(resp)),

        map(resp => this.handleAuthSuccess(resp)),
        catchError((error: any) =>
          this.handleAuthError(error)
      )
      )
  };

  register( name: string, email: string, password: string): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${baseUrl}/auth/register`, {
        email: email,
        password: password,
        name: name
      })
      .pipe(
        map(resp => this.handleAuthSuccess(resp)),
        catchError((error: any) => this.handleAuthError(error))
      )
  }


  /* TODO; implementar cache como en el game.service
  288. Authorization - IsAdminGuard min 6:02 */
  checkStatus(): Observable<boolean> {

    const token = localStorage.getItem('token');
    if (!token){
      this.logout();
      return of(false);
    }



    return this.http.get<AuthResponse>(`${baseUrl}/auth/check-token`, {
      /* headers: {
        'Authorization': `Bearer ${token}`,
      }, */
    }).pipe(
      map(resp => this.handleAuthSuccess(resp)),
      catchError((error: any) => this.handleAuthError(error))
    )

  }

  //GPT
  getUserId(): string | null {
    const user = this._user();  // Accedemos al estado del usuario
    return user ? user._id : null;  // Devuelve el ID del usuario, o null si no está logueado
  }

  logout() {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated');

    localStorage.removeItem('token');
  }

  private handleAuthSuccess({ token, user }: AuthResponse) {
    this._user.set(user);
    this._authStatus.set('authenticated');
    this._token.set(token);

    localStorage.setItem('token', token);

    return true;
  }

  private handleAuthError(error: any) {
    this.logout();
    console.log('Error en la autenticacion', error);
    return of(false);
  }

  updateUser(user: User) {
  this._user.set(user);
}


}
