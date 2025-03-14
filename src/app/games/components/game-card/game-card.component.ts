import { CommonModule, SlicePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GamesResponse } from '@games/interfaces/game.interface';
import { GameImagePipe } from '@games/pipes/game-image.pipe';

@Component({
  selector: 'game-card',
  imports: [RouterLink, SlicePipe, GameImagePipe, CommonModule],
  templateUrl: './game-card.component.html',
})
export class GameCardComponent {

game = input.required<GamesResponse>()


}
