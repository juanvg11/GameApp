import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { GamesService } from '../../../games/services/games.service';
import { of } from 'rxjs';
import { GameCardComponent } from '../game-card/game-card.component';
import { SearchComponent } from '@shared/components/search/search.component';

@Component({
  selector: 'list-game',
  imports: [GameCardComponent, SearchComponent],
  templateUrl: './list-game.component.html',
})
export class ListGameComponent {

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

    gamesFavorite = rxResource({
      request:() => ({}),
      loader:({request}) => {

        return this.GamesService.getFavorites(true);
      }
      });

 }
