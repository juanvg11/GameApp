export interface GameResponse {
  count: number;
  pages: number;
  games: Game[];
}

export interface Game {
  uuid: string;
  _id:          string;
  title:        string;
  platforms:    Platform[];
  developer:    string;
  publisher:    string;
  release_year: number;
  genre:        Genre;
  description:  string;
  image:        string[];
  favorite:     boolean;
  rating:       number;
  isVisible:    boolean;
  createdAt:    Date;
  updatedAt:    Date;
  __v:          number;
}

export enum Genre {
  Indie = "indie", //
  Action = "action",//
  Adventure = "adventure",//
  Shooter = "shooter",//
  RPG = "rpg",//
  Strategy = "strategy",//
  Fighting = "fighting",//
  Simulation = "simulation",//
  Racing = "racing",//
  Sports = "sports",//
  Horror = "horror",//
  Platformer = "platformer",//
  BattleRoyale = "battle-royale",//
  Survival = "survival",//
  OpenWorld = "open-world",//

}

export enum Platform {
  PS5 = "PS5",
  PS4 = "PS4",
  PS3 = "PS3",
  PS2 = "PS2",
  PS1 = "PS1",
  PSP = "PSP",
  XboxSeriesX = "Xbox Series X",
  XboxSeriesS = "Xbox Series S",
  XboxOne = "Xbox One",
  Switch = "Nintendo Switch",
  PC = "PC",
  Nintendo3DS = "Nintendo 3DS",
  WiiU = "Nintendo Wii U",
  Xbox360 = "Xbox 360",


}




/* export interface GamesResponse {
  uuid: string;
  id:          string;
  title:        string;
  platforms:    Platform[];
  developer:    string;
  publisher:    string;
  release_year: number;
  genre:        Genre;
  description:  string;
  image:        string[];
  favorite:     boolean;
  rating:       number;
  isVisible:    boolean;
  createdAt:    Date;
  updatedAt:    Date;
  __v:          number;
}

export enum Genre {
  Action = "Action",
  Adventure = "Adventure",
  Indie = "Indie",
}

export enum Platform {
  Ps4 = "PS4",
  Ps5 = "PS5",
}
 */
