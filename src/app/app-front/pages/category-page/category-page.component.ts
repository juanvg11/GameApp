import { Component, inject, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { GameCardComponent } from '@games/components/game-card/game-card.component';
import { GamesService } from '@games/services/games.service';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { map, of } from 'rxjs';

@Component({
  selector: 'app-category-page',
  imports: [GameCardComponent, PaginationComponent],
  templateUrl: './category-page.component.html',
})
export class CategoryPageComponent {

  route = inject(ActivatedRoute);
  gamesService = inject(GamesService);
  paginationService = inject(PaginationService);

  genre = toSignal(this.route.params.pipe(map(({genre}) => genre)));



gamesResource = rxResource({
request:() => ({genre: this.genre(), page: this.paginationService.currentPage() -1 }),
loader:({request}) => {
  return this.gamesService.getGames({
    genre: request.genre,
    offset: request.page * 9
  });
},
});



}
