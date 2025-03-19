import { Component, inject } from '@angular/core';
import { GameCardComponent } from '@games/components/game-card/game-card.component';
import { GamesService } from '../../../games/services/games.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

import { tap } from 'rxjs';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';



@Component({
  selector: 'app-home-page',
  imports: [GameCardComponent, CommonModule, PaginationComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

GamesService = inject(GamesService);

gamesResource = rxResource({
request:() => ({}),
loader:({request}) => {
  return this.GamesService.getGames({});
}
});



}
