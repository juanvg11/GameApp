import { Game } from "@games/interfaces/game.interface";

export interface User {
  _id: string;
  email: string;
  name: string;
  isActive: boolean;
  roles: string[];
  library: string[];
  favorites: Game[];
}
