import { CommonModule, SlicePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { GamesResponse } from '@games/interfaces/game.interface';
import { GameImagePipe } from '@games/pipes/game-image.pipe';
import { environments } from 'src/environments/environments';
import { GamesService } from '../../../games/services/games.service';


// 'http://localhost:5001'
const baseUrl = environments.baseUrl

@Component({
  selector: 'game-card',
  imports: [RouterLink, SlicePipe, GameImagePipe, CommonModule],
  templateUrl: './game-card.component.html',

})
export class GameCardComponent {


  constructor(private http: HttpClient) {}

game = input.required<GamesResponse>()

toggleFavorite(uuid: string) {
  this.http.patch(`${baseUrl}/games/${uuid}/favorite`, { favorite: !this.game().favorite })
    .subscribe(response => {
      this.game().favorite = !this.game().favorite;  // Cambiar el estado local
      console.log('Favorito actualizado:', this.game());
      console.log('Respuesta backend:',response)
    });
}



}
