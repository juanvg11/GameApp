export interface GamesResponse {
  uuid: string;
  //id:          string;
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

