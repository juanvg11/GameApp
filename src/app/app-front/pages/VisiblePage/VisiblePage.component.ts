import { Component, effect, inject, OnInit } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { GameCardComponent } from '@games/components/game-card/game-card.component';
import { GamesService } from '@games/services/games.service';
import { PaginationService } from '../../../shared/components/pagination/pagination.service';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-visible-page',
  imports: [GameCardComponent, PaginationComponent],
  templateUrl: './VisiblePage.component.html',
})
export class VisiblePageComponent  {

  /* ngOnInit(): void {
    const userId = this.authService.getUserId();
    console.log('ID del usuario:', userId);
  } */

  authService = inject(AuthService);
  GamesService= inject(GamesService);
  paginationService = inject(PaginationService);


  //YA TENGO EL ID DEL USUARIO AHORA ME QUEDA HACER UNA PETICION A LA API PARA OBTENER SU BIBLIOTECA
/*   gamesResource = rxResource({
    request:() => ({ page: this.paginationService.currentPage() -1 }),
    loader:({request}) => {

      return this.GamesService.getUserLibrary(this.authService.user()!._id);
    }
    }); */


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


