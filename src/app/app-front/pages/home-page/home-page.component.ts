import { Component } from '@angular/core';
import { GameCardComponent } from '@games/components/game-card/game-card.component';


@Component({
  selector: 'app-home-page',
  imports: [GameCardComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent { }
