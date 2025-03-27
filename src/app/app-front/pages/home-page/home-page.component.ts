import { Component, inject, resource, signal } from '@angular/core';
import { GameCardComponent } from '@games/components/game-card/game-card.component';
import { GamesService } from '../../../games/services/games.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

import { firstValueFrom, of, tap } from 'rxjs';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { SearchComponent } from '@shared/components/search/search.component';
import { GamesResponse } from '@games/interfaces/game.interface';
import { RouterLink } from '@angular/router';
import { CategorySelectComponent } from '@shared/components/category-select/category-select.component';
import { ListGameComponent } from '@games/components/list-game/list-game.component';



@Component({
  selector: 'app-home-page',
  imports: [ CommonModule, CategorySelectComponent, ListGameComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

GamesService = inject(GamesService);
query = signal('')


searchResource = rxResource({
  request:() => ({query: this.query() }),
  loader: ({request}) => {
    if(!request.query) return of([]) //Importantisimo, ya que si no hay nada para buscar falla la consulta http://localhost:5001/games/search/????
    return this.GamesService.searchByGame(request.query)

  }

})

gamesResource = rxResource({
  request:() => ({}),
  loader:({request}) => {

   // console.log(request)
    return this.GamesService.getGames({})
  }
  });









}
