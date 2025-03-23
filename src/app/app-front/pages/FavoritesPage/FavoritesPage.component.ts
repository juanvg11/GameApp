import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { GamesService } from '../../../games/services/games.service';
import { GameCardComponent } from '@games/components/game-card/game-card.component';

@Component({
  selector: 'app-favorites-page',
  imports: [GameCardComponent],
  templateUrl: './FavoritesPage.component.html',
})
export class FavoritesPageComponent {


  GamesService= inject(GamesService);
  gamesResource = rxResource({
    request:() => ({}),
    loader:({request}) => {

      return this.GamesService.getFavorites(true);
    }
    });

}
