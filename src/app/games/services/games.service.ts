import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GamesResponse } from '@games/interfaces/game.interface';
import { Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GamesService {


  private http = inject(HttpClient);


getGames():Observable<GamesResponse>{
  return this.http.get<GamesResponse>('http://localhost:3000/games')
  .pipe(tap(resp => console.log(resp)));
}

}
