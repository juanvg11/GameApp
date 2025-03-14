export interface GamesResponse {
  id:           string;
  title:        string;
  platforms:    Platform[];
  developer:    string;
  publisher:    string;
  release_year: number;
  genre:        Genre;
  description:  string;
  image:        string;
  favorite:     boolean;
  rating:       number;
}

export enum Genre {
  ActionAdventure = "Action-Adventure",
  ActionRPG = "Action RPG",
  Racing = "Racing",
}

export enum Platform {
  Ps4 = "PS4",
  Ps5 = "PS5",
}
