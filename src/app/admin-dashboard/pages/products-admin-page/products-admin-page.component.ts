import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { GameTableComponent } from '@games/components/game-table/game-table.component';
import { GamesService } from '@games/services/games.service';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { PaginationService } from '@shared/components/pagination/pagination.service';

@Component({
  selector: 'app-products-admin-page',
  imports: [GameTableComponent, PaginationComponent, RouterLink],
  templateUrl: './products-admin-page.component.html',
})
export class ProductsAdminPageComponent {

  gamesService = inject(GamesService);
  paginationService = inject(PaginationService)

  gamesPerPage = signal(8)



  /* Tarea Fernando */
  gamesResource = rxResource({
    request:() => ({ pages: this.paginationService.currentPage() -1,
      limit: this.gamesPerPage()

    }),
    loader:({request}) => {

     // console.log(request)
      return this.gamesService.getGames({
        offset: request.pages * 8,
        limit: request.limit
      })
    }
    });

}
