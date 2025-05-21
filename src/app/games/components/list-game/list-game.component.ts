import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { GamesService } from '../../../games/services/games.service';
import {  of } from 'rxjs';
import { GameCardComponent } from '../game-card/game-card.component';
import { SearchComponent } from '@shared/components/search/search.component';
import { CategorySelectComponent } from '@shared/components/category-select/category-select.component';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { AuthService } from '@auth/services/auth.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'list-game',
  imports: [GameCardComponent, SearchComponent, CategorySelectComponent, PaginationComponent, RouterLink],
  templateUrl: './list-game.component.html',
})
export class ListGameComponent {

  gamesService = inject(GamesService);
  paginationService = inject(PaginationService)
  authService = inject(AuthService);
  query = signal('')

  genreFilter = signal('');
  pageSignal = signal(0);


/*   activatedRoute = inject(ActivatedRoute)

  currentPage = toSignal(
    this.activatedRoute.queryParamMap.pipe(
    map(params => (params.get('page') ? +params.get('page')! : 1)),
    map( page => (isNaN(page) ? 1 : page))
  ),
  {
    initialValue: 1, // Valor inicial
  }
); */


  searchResource = rxResource({
    request:() => ({query: this.query() }),
    loader: ({request}) => {
      if(!request.query) return of() //Importantisimo, ya que si no hay nada para buscar falla la consulta http://localhost:5001/games/search/????
      return this.gamesService.getGames({search: request.query})

    }

  })

  gamesResourceList = rxResource({
    request:() => ({ pages: this.paginationService.currentPage() -1 }),
    loader:({request}) => {

     // console.log(request)
      return this.gamesService.getGames({
        offset: request.pages * 8,
        limit: 8
      })
    }
    });






 }
