import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { GamesService } from '@games/services/games.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EMPTY, map, switchMap, tap } from 'rxjs';
import { GameCarouselComponent } from '@games/components/game-carousel/game-carousel.component';




@Component({
  selector: 'app-game-page',
  imports: [CommonModule, GameCarouselComponent],
  templateUrl: './game-page.component.html',
})
export class GamePageComponent {


  activatedRoute = inject(ActivatedRoute);
  gameService = inject(GamesService);

   /* gameId = this.activatedRoute.snapshot.params['íd']; */
  gameId = this.activatedRoute.paramMap.pipe(
    map(params => params.get('id') ?? '')
  );

  gamesResource = rxResource({
    request: () => this.gameId,
    loader: ({ request }) => request.pipe(
      switchMap(id => {
        if (!id) return EMPTY; // 🔥 Cambiamos null por EMPTY
        return this.gameService.getGameById(id);
      })
    )
  });





/*   gamesResource = rxResource({
    request: () => ({ id: this.gameId }),
    loader: ({ request }) =>
      this.gameService.getGameById(request.id),
  }); */




}
