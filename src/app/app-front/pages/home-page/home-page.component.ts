import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListGameComponent } from '@games/components/list-game/list-game.component';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';



@Component({
  selector: 'app-home-page',
  imports: [ CommonModule, ListGameComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

}
