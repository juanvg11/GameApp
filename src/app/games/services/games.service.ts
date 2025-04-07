import { HttpClient } from '@angular/common/http';
import { inject, Injectable, input } from '@angular/core';
import { Game, GameResponse } from '@games/interfaces/game.interface';

import { delay, Observable, of, tap } from 'rxjs';
import { environments } from 'src/environments/environments';

// 'http://localhost:5001'
const baseUrl = environments.baseUrl

interface Options {
  genre?: string;
  favorite?: boolean;
  search?:string;
  visible?:boolean;
  limit?: number;
  offset?: number;
}

@Injectable({providedIn: 'root'})
export class GamesService {


  private http = inject(HttpClient);

  private gamesCache = new Map<string, GameResponse>();
  private gameCache = new Map<string, Game>();


/* getGames():Observable<GamesResponse[]>{
  return this.http.get<GamesResponse[]>(`${baseUrl}/games`)
  .pipe(tap(resp => console.log(resp)));
} */

  getGames(options: Options):Observable<GameResponse>{

    const { limit = 0, offset = 0, genre = '', search = '', visible = false } = options;
    const key = `${limit}-${offset}-${genre}-${search}-${visible}`;
    if (this.gamesCache.has(key)) {
      return of(this.gamesCache.get(key)!);
    }

    return this.http.get<GameResponse>(`${baseUrl}/games`, {
        params: {
          ...options
        }
      })
    .pipe(
      tap(resp => console.log(resp)),
      tap(resp => this.gamesCache.set(key, resp))
    );
  }

   // Método para obtener juegos por género
  /*  getGamesByGenre(genre: string): Observable<GamesResponse[]> {
    return this.http.get<GamesResponse[]>(`${baseUrl}/games/genre/${genre}`);
  } */

 /*  searchByGame( query: string){

    query = query.toLowerCase()

      return this.http.get<GamesResponse[]>(`${baseUrl}/games/search/${query}`)


  } */


   getGameById(id:string):Observable<Game>{
  if (this.gameCache.has(id)) {
    return of(this.gameCache.get(id)!);
  }
  return this.http.get<Game>(`${baseUrl}/games/${id}`)
  .pipe(
    //delay(2000),
    tap(game => this.gameCache.set(id, game))
  )

}

/* getVisibles(visible:boolean){
  return this.http.get<GamesResponse[]>(`${baseUrl}/games/visible/${visible}`);
} */


}
