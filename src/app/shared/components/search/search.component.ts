import { Component, HostListener, output } from '@angular/core';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
})
export class SearchComponent {

value = output<string>()
isLargeScreen: boolean = window.innerWidth >= 1024; // Tamaño de pantalla para lg

@HostListener('window:resize', ['$event'])
onResize(event: Event) {
  this.isLargeScreen = window.innerWidth >= 1024; // Ajusta el valor según el breakpoint lg que uses
}


}
