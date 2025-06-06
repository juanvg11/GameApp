import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, HostListener, inject, Output, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'category-select',
  imports: [
    RouterLink, CommonModule
  ],
  templateUrl: './category-select.component.html'

})
export class CategorySelectComponent {

  /* private router = inject(Router);
  private currentPath = signal(this.router.url);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.currentPath.set((event as NavigationEnd).urlAfterRedirects);
    });
  }

  isCurrentRoute = (path: string) => computed(() => this.currentPath() === path); */


/* currentRoute = signal('');

  constructor(private router: Router) {
    this.currentRoute.set(this.router.url);
    this.router.events.subscribe(() => {
      this.currentRoute.set(this.router.url);
    });
  }

  isCurrentRoute(path: string): boolean {
    return this.currentRoute() === path;

  } */



  private router = inject(Router);
  currentPath = signal(this.router.url);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentPath.set(event.urlAfterRedirects);
    });
  }

  isActive = (path: string) => computed(() => this.currentPath() === path);

   isLargeScreen: boolean = window.innerWidth >= 1024; // Tamaño de pantalla para lg

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isLargeScreen = window.innerWidth >= 1024; // Ajusta el valor según el breakpoint lg que uses
  }

  getCurrentGenre(): string {
  return this.router.url; // Devuelve la URL actual para marcarla como seleccionada
}

navigateTo(path: string): void {
  this.router.navigateByUrl(path);
}




}
