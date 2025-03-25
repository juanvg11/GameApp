import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { GameCardComponent } from '@games/components/game-card/game-card.component';
import { GamesService } from '@games/services/games.service';

@Component({
  selector: 'app-visible-page',
  imports: [GameCardComponent],
  templateUrl: './VisiblePage.component.html',
})
export class VisiblePageComponent {


  GamesService= inject(GamesService);
  gamesResource = rxResource({
    request:() => ({}),
    loader:({request}) => {

      return this.GamesService.getVisibles(true);
    }
    });

}
