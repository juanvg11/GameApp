import { HttpClient } from '@angular/common/http';
import { inject, Injectable, input } from '@angular/core';
import { GamesResponse } from '@games/interfaces/game.interface';
import { Observable, tap } from 'rxjs';
import { environments } from 'src/environments/environments';

// 'http://localhost:5001'
const baseUrl = environments.baseUrl

interface Options {
  genre?: string;
}

@Injectable({providedIn: 'root'})
export class GamesService {


  private http = inject(HttpClient);






/* getGames():Observable<GamesResponse[]>{
  return this.http.get<GamesResponse[]>(`${baseUrl}/games`)
  .pipe(tap(resp => console.log(resp)));
} */

  getGames(options: Options):Observable<GamesResponse[]>{
    const { genre = '' } = options;

    return this.http.get<GamesResponse[]>(`${baseUrl}/games`, {
        params: {
          genre,
        },
      })
    .pipe(tap(resp => console.log(resp)));
  }

   // Método para obtener juegos por género
   getGamesByGenre(genre: string): Observable<GamesResponse[]> {
    return this.http.get<GamesResponse[]>(`${baseUrl}/games/genre/${genre}`);
  }

  searchByGame( query: string){

    query = query.toLowerCase()

    return this.http.get(`${baseUrl}/games/search/${query}`)

  }


   getGameById(id:string):Observable<GamesResponse>{
  //console.log('Hola')
  return this.http.get<GamesResponse>(`${baseUrl}/games/${id}`);

}

getFavorites(favorite:boolean){
  return this.http.get<GamesResponse[]>(`${baseUrl}/games/favorite/${favorite}`);
}


}
