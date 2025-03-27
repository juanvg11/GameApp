import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'front-navbar',
  imports: [RouterLink],
  templateUrl: './front-navbar.component.html',
})
export class FrontNavbarComponent {

  isLargeScreen: boolean = window.innerWidth >= 1024; // Tamaño de pantalla para lg

  /* @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isLargeScreen = window.innerWidth >= 1024; // Ajusta el valor según el breakpoint lg que uses
  } */

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
