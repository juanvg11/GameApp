export interface User {
  _id: string;
  email: string;
  name: string;
  isActive: boolean;
  roles: string[];
  library: string[];
  favorites: string[];
}
