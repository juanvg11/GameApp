import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { GameCardComponent } from '@games/components/game-card/game-card.component';
import { GamesService } from '@games/services/games.service';
import { PaginationService } from '../../../shared/components/pagination/pagination.service';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { AuthService } from '@auth/services/auth.service';
import { Game } from '@games/interfaces/game.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visible-page',
  imports: [GameCardComponent, PaginationComponent, CommonModule],
  templateUrl: './VisiblePage.component.html',
})
export class VisiblePageComponent  {

  authService = inject(AuthService);
  paginationService = inject(PaginationService);

  private gamesPerPage = 8;

  // Computed signal para acceder directamente a los favoritos del usuario
  allLibraryGames = computed<Game[]>(() => {
    const user = this.authService.user();
    //console.log('UserSignal:', user);
    return user?.library ?? [];
  });

  // Total de páginas
  totalPages = computed(() => {
    const total = this.allLibraryGames().length;
    return Math.ceil(total / this.gamesPerPage);
  });


  // Computed para obtener solo los juegos de la página actual
  paginatedLibrary = computed<Game[]>(() => {
    const currentPage = this.paginationService.currentPage();
    const allGames = this.allLibraryGames();

    const start = (currentPage - 1) * this.gamesPerPage;
    return allGames.slice(start, start + this.gamesPerPage);
  });







  /*   gamesResource = rxResource({
     request:() => ({ page: this.paginationService.currentPage() -1 }),
     loader:({request}) => {

       return this.GamesService.getGames({
         visible: true,
         offset: request.page * 8,
         limit: 8,
       });
     }
     }); */
  }


