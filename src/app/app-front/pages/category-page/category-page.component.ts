import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { GameCardComponent } from '@games/components/game-card/game-card.component';
import { GamesService } from '@games/services/games.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-category-page',
  imports: [GameCardComponent],
  templateUrl: './category-page.component.html',
})
export class CategoryPageComponent {

  route = inject(ActivatedRoute);
  GamesService = inject(GamesService);

  genre = toSignal(this.route.params.pipe(map(({genre}) => genre)));



gamesResource = rxResource({
request:() => ({genre: this.genre()}),
loader:({request}) => {
  return this.GamesService.getGames({
    category: request.genre,
  });
},
});
}
