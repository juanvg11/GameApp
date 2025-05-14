import { Component, inject, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { GameCardComponent } from '@games/components/game-card/game-card.component';
import { GamesService } from '@games/services/games.service';
import { CategorySelectComponent } from '@shared/components/category-select/category-select.component';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { SearchComponent } from '@shared/components/search/search.component';
import { map, of } from 'rxjs';

@Component({
  selector: 'app-category-page',
  imports: [GameCardComponent, PaginationComponent, CategorySelectComponent, SearchComponent],
  templateUrl: './category-page.component.html',
})
export class CategoryPageComponent {

  route = inject(ActivatedRoute);
  gamesService = inject(GamesService);
  paginationService = inject(PaginationService);
  query = signal('')

  genre = toSignal(this.route.params.pipe(map(({genre}) => genre)));

    searchResource = rxResource({
    request:() => ({query: this.query() }),
    loader: ({request}) => {
      if(!request.query) return of() //Importantisimo, ya que si no hay nada para buscar falla la consulta http://localhost:5001/games/search/????
      return this.gamesService.getGames({search: request.query})

    }

  })



gamesResource = rxResource({
request:() => ({genre: this.genre(), page: this.paginationService.currentPage() -1 }),
loader:({request}) => {
  return this.gamesService.getGames({
    genre: request.genre,
    offset: request.page * 9,
    limit: 9
  });
},
});



}
