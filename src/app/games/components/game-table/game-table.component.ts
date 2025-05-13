import { Component, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Game } from '@games/interfaces/game.interface';
import { GameImagePipe } from '@games/pipes/game-image.pipe';
import { GamesService } from '@games/services/games.service';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { ListGameComponent } from '../list-game/list-game.component';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';

@Component({
  selector: 'game-table',
  imports: [GameImagePipe, RouterLink],
  templateUrl: './game-table.component.html',
})
export class GameTableComponent {

  games = input.required<Game[]>()






}
