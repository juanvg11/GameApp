import { CommonModule, SlicePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { GamesResponse } from '@games/interfaces/game.interface';
import { GameImagePipe } from '@games/pipes/game-image.pipe';
import { environments } from 'src/environments/environments';
import { GamesService } from '../../../games/services/games.service';
import { FormsModule } from '@angular/forms';


// 'http://localhost:5001'
const baseUrl = environments.baseUrl

@Component({
  selector: 'game-card',
  imports: [RouterLink, SlicePipe, GameImagePipe, CommonModule, FormsModule],
  templateUrl: './game-card.component.html',

})
export class GameCardComponent {


  constructor(private http: HttpClient) {}

game = input.required<GamesResponse>()
ratingValue: number = 0;

toggleFavorite(uuid: string) {
  this.http.patch(`${baseUrl}/games/${uuid}/favorite`, { favorite: !this.game().favorite })
    .subscribe(response => {
      this.game().favorite = !this.game().favorite;  // Cambiar el estado local
      console.log('Favorito actualizado:', this.game());
      console.log('Respuesta backend:',response)
    });
}

toggleVisible(uuid: string) {
  this.http.patch(`${baseUrl}/games/${uuid}/visible`, { isVisible: !this.game().isVisible })
    .subscribe(response => {
      this.game().isVisible = !this.game().isVisible;  // Cambiar el estado local
      console.log('Visible actualizado:', this.game());
      console.log('Respuesta Visible backend:',response)
    });
}

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
