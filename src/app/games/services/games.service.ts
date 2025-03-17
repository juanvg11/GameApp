import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GamesResponse } from '@games/interfaces/game.interface';
import { Observable, tap } from 'rxjs';
import { environments } from 'src/environments/environments';

// 'http://localhost:3000'
const baseUrl = environments.baseUrl

@Injectable({providedIn: 'root'})
export class GamesService {


  private http = inject(HttpClient);


getGames():Observable<GamesResponse[]>{
  return this.http.get<GamesResponse[]>(`${baseUrl}/games`)
  .pipe(tap(resp => console.log(resp)));
}

getGameById(id:string):Observable<GamesResponse>{
  return this.http.get<GamesResponse>(`${baseUrl}/games/${id}`);

}

}
