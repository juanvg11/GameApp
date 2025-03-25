import { Component, inject } from '@angular/core';
import { GameCardComponent } from '@games/components/game-card/game-card.component';
import { GamesService } from '../../../games/services/games.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

import { tap } from 'rxjs';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { SearchComponent } from '@shared/components/search/search.component';



@Component({
  selector: 'app-home-page',
  imports: [GameCardComponent, CommonModule],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

GamesService = inject(GamesService);

onsearch(query: string){
   this.GamesService.searchByGame(query).subscribe(resp => {
    console.log(resp)
  })
}



gamesResource = rxResource({
request:() => ({}),
loader:({request}) => {
  return this.GamesService.getGames({});
}
});



}
