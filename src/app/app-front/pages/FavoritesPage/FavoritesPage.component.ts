import { Component, computed, inject } from '@angular/core';
import { GamesService } from '../../../games/services/games.service';
import { GameCardComponent } from '@games/components/game-card/game-card.component';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { AuthService } from '@auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { Game } from '@games/interfaces/game.interface';


@Component({
  selector: 'app-favorites-page',
  imports: [GameCardComponent, PaginationComponent, CommonModule],
  templateUrl: './FavoritesPage.component.html',
})
export class FavoritesPageComponent {


  authService = inject(AuthService);
  paginationService = inject(PaginationService)

  private gamesPerPage = 8;

  // Computed signal para acceder directamente a los favoritos del usuario
  allFavoriteGames = computed<Game[]>(() => {
    const user = this.authService.user();
    console.log('UserSignal:', user);
    return user?.favorites ?? [];
  });



  // Total de páginas
  totalPages = computed(() => {
    const total = this.allFavoriteGames().length;
    return Math.ceil(total / this.gamesPerPage);
  });


  // Computed para obtener solo los juegos de la página actual
  paginatedFavorites = computed<Game[]>(() => {
    const currentPage = this.paginationService.currentPage();
    const allGames = this.allFavoriteGames();

    const start = (currentPage - 1) * this.gamesPerPage;
    return allGames.slice(start, start + this.gamesPerPage);
  });




/*
  gamesResourceFavorite = rxResource({
    request:() => ({page: this.paginationService.currentPage() -1 }),
    loader:({request}) => {

      return this.GamesService.getGames({
        favorite: true,
        offset: request.page * 8,
        limit: 8

       });
    }
    }); */

/*   mostrarFavoritos(): void {
  const usuario = this.AuthService.user();
  if (usuario && usuario.favorites) {
    console.log('Favoritos del usuario:', usuario.favorites);
    console.log('UserSignal:', usuario.favorites);

  } else {
    console.log('No hay usuario autenticado o no hay favoritos.');
  }
} */



}
