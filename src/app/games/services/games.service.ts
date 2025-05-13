import { HttpClient } from '@angular/common/http';
import { inject, Injectable, input } from '@angular/core';
import { Game, GameResponse, Genre } from '@games/interfaces/game.interface';

import { delay, forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
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

const emptyGame: Game = {
  uuid: '',
  _id: 'new',
  title: '',
  platforms: [],
  developer: '',
  publisher: '',
  release_year: 0,
  genre: Genre.Action,
  description: '',
  image: [],
  favorite: false,
  rating: 0,
  isVisible: false,
  createdAt: new Date('2023-10-01T00:00:00.000Z'),
  updatedAt: new Date('2023-10-01T00:00:00.000Z'),
  __v: 0
}

@Injectable({providedIn: 'root'})
export class GamesService {


  private http = inject(HttpClient);

  private gamesCache = new Map<string, GameResponse>();
  private gameCache = new Map<string, Game>();




  getGames(options: Options):Observable<GameResponse>{

    const { limit = 0, offset = 0, genre = '', search = '', visible = false, favorite = false } = options;
    const key = `${limit}-${offset}-${genre}-${search}-${visible}-${favorite}`;
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

   getGameById(id:string):Observable<Game>{

    if(id === 'new'){
      console.log('Juego Vacio', emptyGame)
      return of(emptyGame);
    }

  if (this.gameCache.has(id)) {
    return of(this.gameCache.get(id)!);
  }

  return this.http.get<Game>(`${baseUrl}/games/${id}`)
  .pipe(
    //delay(2000),
    tap(game => this.gameCache.set(id, game))
  )

}
/* GPT */
getGamesByIds(ids: string[]): Observable<Game[]> {
  return this.http.get<Game[]>(`${baseUrl}/games/by-ids`, {
    params: { ids: ids.join(',') }
  });
}

updateGameByUuid(uuid: string, productLike: Partial<Game>, imageFileList?: FileList): Observable<Game>{

 /*  updateGameByUuid(uuid: string, productLike: Partial<Game>, imageFileList?: FileList): Observable<Game>{ */
   const currentImages = productLike.image ?? [];

  console.log('currentImages', currentImages);

    return this.uploadImages(imageFileList).pipe(
      map((imageNames) => ({
        ...productLike,
        image: [...currentImages, ...imageNames],

      })),
      switchMap((updatedProduct) =>
        this.http.patch<Game>(`${baseUrl}/games/uuid/${uuid}`, updatedProduct)
      ),
      tap((game) => this.updateProductCache(game))
    );


  /* return this.http.patch<Game>(`${baseUrl}/games/uuid/${uuid}`, productLike)
  .pipe(tap((game) => this.updateProductCache(game))); */

}

createGame(gameLike: Partial<Game>, imageFileList?: FileList): Observable<Game> {

  const currentImages = gameLike.image ?? [];

  console.log('currentImages', currentImages);

    return this.uploadImages(imageFileList).pipe(
      map((imageNames) => ({
        ...gameLike,
        image: [...currentImages, ...imageNames],

      })),
      switchMap((createdProduct) =>
        this.http.post<Game>(`${baseUrl}/games`, createdProduct)
      ),
      tap((game) => this.updateProductCache(game))
    );


  /* console.log('Creando juego en el service', gameLike);
  return this.http.post<Game>(`${baseUrl}/games`, gameLike)
  .pipe(tap((game) => this.updateProductCache(game)),
  tap((game) => console.log(game))); */
}

updateProductCache(product: Game) {
  const productId = product._id;

  this.gameCache.set(productId, product);

  this.gamesCache.forEach((productResponse) => {
    productResponse.games = productResponse.games.map(
      (currentProduct) =>
        currentProduct._id === productId ? product : currentProduct
    );
  });

  console.log('Caché actualizado');
}

uploadImages(images?: FileList): Observable<string[]>{
  if (!images) return of([]);

  const uploadObservables = Array.from(images).map((imageFile) =>
    this.uploadImage(imageFile)
  );

  return forkJoin(uploadObservables).pipe(
    tap((imageNames) => console.log({ imageNames }))
  );
}

uploadImage(imageFile: File): Observable<string>{
  const formData = new FormData();
  formData.append('file', imageFile);

  return this.http
  .post<{ secureUrl: string }>(`${baseUrl}/files/game`, formData)
  .pipe(map((resp) => resp.secureUrl));
   /*  .post<{ fileName: string }>(`${baseUrl}/files/game`, formData)
    .pipe(map((resp) => resp.fileName)); */
}


// Método para crear un nuevo juego







//GPT
// Método para añadir un juego a la biblioteca
addGameToLibrary(userId: string, gameId: string): Observable<any> {
  return this.http.post(`${baseUrl}/auth/${userId}/library/${gameId}`, {});
}
//GPT
// Método para eliminar un juego de la biblioteca
removeGameFromLibrary(userId: string, gameId: string): Observable<any> {
  return this.http.delete(`${baseUrl}/auth/${userId}/library/${gameId}`);
}
//GPT
// Método para alternar el estado de favorito
toggleFavorite(userId: string, gameId: string): Observable<any> {
  return this.http.post(`${baseUrl}/auth/${userId}/favorites/${gameId}`, {});
}

//GPT
// Obtener la librería de juegos del usuario
getUserLibrary(userId: string): Observable<any> {
  return this.http.get(`${baseUrl}/auth/${userId}/library`);
}

//GPT
// Alternar un juego entre favoritos
toggleFavorite2(userId: string, gameId: string): Observable<any> {
  return this.http.patch(`${baseUrl}/users/${userId}/favorites/${gameId}`, {});
}

/* getGames():Observable<GamesResponse[]>{
  return this.http.get<GamesResponse[]>(`${baseUrl}/games`)
  .pipe(tap(resp => console.log(resp)));
} */

/* getVisibles(visible:boolean){
  return this.http.get<GamesResponse[]>(`${baseUrl}/games/visible/${visible}`);
} */

     // Método para obtener juegos por género
  /*  getGamesByGenre(genre: string): Observable<GamesResponse[]> {
    return this.http.get<GamesResponse[]>(`${baseUrl}/games/genre/${genre}`);
  } */

 /*  searchByGame( query: string){

    query = query.toLowerCase()

      return this.http.get<GamesResponse[]>(`${baseUrl}/games/search/${query}`)


  } */


}
