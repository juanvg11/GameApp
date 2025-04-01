import { HttpClient } from '@angular/common/http';
import { inject, Injectable, input } from '@angular/core';
import { GamesResponse } from '@games/interfaces/game.interface';
import { Observable, tap } from 'rxjs';
import { environments } from 'src/environments/environments';

// 'http://localhost:5001'
const baseUrl = environments.baseUrl

interface Options {
  genre?: string;
  favorite?: boolean;
  search?:string
}

@Injectable({providedIn: 'root'})
export class GamesService {


  private http = inject(HttpClient);






/* getGames():Observable<GamesResponse[]>{
  return this.http.get<GamesResponse[]>(`${baseUrl}/games`)
  .pipe(tap(resp => console.log(resp)));
} */

  getGames(options: Options):Observable<GamesResponse[]>{

    return this.http.get<GamesResponse[]>(`${baseUrl}/games`, {
        params: {
          ...options
        }
      })
    .pipe(tap(resp => console.log(resp)));
  }

   // Método para obtener juegos por género
   getGamesByGenre(genre: string): Observable<GamesResponse[]> {
    return this.http.get<GamesResponse[]>(`${baseUrl}/games/genre/${genre}`);
  }

  searchByGame( query: string){

    query = query.toLowerCase()

      return this.http.get<GamesResponse[]>(`${baseUrl}/games/search/${query}`)


  }


   getGameById(id:string):Observable<GamesResponse>{
  //console.log('Hola')
  return this.http.get<GamesResponse>(`${baseUrl}/games/${id}`);

}

getVisibles(visible:boolean){
  return this.http.get<GamesResponse[]>(`${baseUrl}/games/visible/${visible}`);
}


}
