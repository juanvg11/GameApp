import { Component, inject, OnInit } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { GamesService } from '../../../games/services/games.service';
import { GameCardComponent } from '@games/components/game-card/game-card.component';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-favorites-page',
  imports: [GameCardComponent, PaginationComponent],
  templateUrl: './FavoritesPage.component.html',
})
export class FavoritesPageComponent {



  GamesService= inject(GamesService);

  paginationService = inject(PaginationService)



  gamesResourceFavorite = rxResource({
    request:() => ({page: this.paginationService.currentPage() -1 }),
    loader:({request}) => {

      return this.GamesService.getGames({
        favorite: true,
        offset: request.page * 8,
        limit: 8

       });
    }
    });




}
