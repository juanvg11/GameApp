import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { GameCardComponent } from '@games/components/game-card/game-card.component';
import { GamesService } from '@games/services/games.service';
import { PaginationService } from '../../../shared/components/pagination/pagination.service';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';

@Component({
  selector: 'app-visible-page',
  imports: [GameCardComponent, PaginationComponent],
  templateUrl: './VisiblePage.component.html',
})
export class VisiblePageComponent {


  GamesService= inject(GamesService);
  paginationService = inject(PaginationService);

  gamesResource = rxResource({
    request:() => ({ page: this.paginationService.currentPage() -1 }),
    loader:({request}) => {

      return this.GamesService.getGames({
        visible: true,
        offset: request.page * 8,
        limit: 8,
      });
    }
    });

}
