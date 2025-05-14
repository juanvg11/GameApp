import { CommonModule, SlicePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, Input, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { Game } from '@games/interfaces/game.interface';
import { GameImagePipe } from '@games/pipes/game-image.pipe';
import { environments } from 'src/environments/environments';
import { GamesService } from '../../../games/services/games.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { User } from '@auth/interfaces/user.interface';
import { MatIconModule } from '@angular/material/icon';

// 'http://localhost:5001'
const baseUrl = environments.baseUrl

@Component({
  selector: 'game-card',
  imports: [RouterLink, SlicePipe, GameImagePipe, CommonModule, FormsModule, MatIconModule],
  templateUrl: './game-card.component.html',

})
export class GameCardComponent {



constructor(private http: HttpClient, public router: Router) {

}

game = input.required<Game>()
ratingValue: number = 0;
authService = inject(AuthService);

readonly user = this.authService.user; // ya es una computed signal


readonly isFavorite = computed(() =>
  this.user()?.favorites.some(game => game._id === this.game()._id) ?? false
);



/* readonly isInLibrary = computed(() =>
  this.user()?.library.some(game => game._id === this.game()._id) ?? false
); */


toggleFavorite(gameId: string) {
  const userId = this.authService.getUserId();

  this.http.patch<User>(`${baseUrl}/auth/${userId}/favorites/${gameId}`, {})
  .subscribe(updatedUser => {
    // Actualiza la señal del usuario con el nuevo valor
    this.authService.updateUser(updatedUser);
  });
}



/* toggleLibrary(gameId: string) {
  const userId = this.authService.getUserId();

  this.http.patch<User>(`${baseUrl}/auth/${userId}/library/${gameId}`, {})
  .subscribe(updatedUser => {
    // Actualiza la señal del usuario con el nuevo valor
    this.authService.updateUser(updatedUser);
  });
} */


/* Primer toggleFavorite, el cual no me sirve ya que anteriormente solo actualizaba el atributo favorite de Game.
Cosa que es inviable al teener autentificacion ya que cada usuario tendra sus propios favoritos */
/* toggleFavorite(uuid: string) {
  this.http.patch(`${baseUrl}/games/${uuid}/favorite`, { favorite: !this.game().favorite })
    .subscribe(response => {
      this.game().favorite = !this.game().favorite;  // Cambiar el estado local
      console.log('Favorito actualizado:', this.game());
      console.log('Respuesta backend:',response)
    });
} */

/*  Segundo metodo, el cual hacia su funcion pero no cambiaba el estado local del juego, solo anadia el juego en el array de favoritos del usuario loggeado
    toggleFavorite(gameid: string) {
  const userId = this.authService.getUserId(); // Asumiendo que tienes un servicio de autenticación para obtener el ID del usuario logueado
  console.log(this.game().favorite)

  this.http.patch<User>(`${baseUrl}/auth/${userId}/favorites/${gameid}`, {})
    .subscribe(response => {
      // La respuesta debe incluir el usuario actualizado con los juegos favoritos poblados
      const updatedUser = response; // Asegúrate de que la respuesta tiene el usuario actualizado
      // Aquí puedes actualizar el estado de los favoritos en tu componente
      const isFavorite = updatedUser.favorites.some(game => game._id === gameid); // Verifica si el juego está en los favoritos

      // Si el juego está en los favoritos, lo quitamos de la lista localmente
      if (isFavorite) {
        this.game().favorite = true; // Actualizar el estado local del juego (o solo actualizar la UI si lo prefieres)
      } else {
        this.game().favorite = false; // Actualizar el estado local del juego
      }

      console.log('Favoritos actualizados:', updatedUser.favorites);
    });
} */


/* toggleVisible(uuid: string) {
  this.http.patch(`${baseUrl}/games/${uuid}/visible`, { isVisible: !this.game().isVisible })
    .subscribe(response => {
      this.game().isVisible = !this.game().isVisible;  // Cambiar el estado local
      console.log('Visible actualizado:', this.game());
      console.log('Respuesta Visible backend:',response)
    });
} */

/* ratingGame(uuid: string){
  this.http.patch(`${baseUrl}/games/${uuid}/rating`, { rating: 0 })
  .subscribe(response => {
    this.game().rating = 0;  // Cambiar el estado local
    console.log('Favorito actualizado:', this.game());
    console.log('Respuesta backend:',response)
  });
} */

  ratingGame(uuid: string, rating:number)  {
    if (isNaN(rating) || rating < 0 || rating > 10) {
      console.log('Introduce un número válido entre 0 y 10');
      return;
    }

    this.http.patch(`${baseUrl}/games/${uuid}/rating`, { rating })
      .subscribe(response => {
        this.game().rating = rating; // Actualizar el estado local
        console.log('Rating actualizado:', this.game());
        console.log('Respuesta backend:', response);
      });
  }

}
