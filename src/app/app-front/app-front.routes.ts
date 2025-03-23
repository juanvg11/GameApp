import { Routes } from "@angular/router";
import { AppFrontLayoutComponent } from "./layouts/app-front-layout/app-front-layout.component";
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CategoryPageComponent } from "./pages/category-page/category-page.component";
import { GamePageComponent } from "./pages/game-page/game-page.component";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";
import { FavoritesPageComponent } from "./pages/FavoritesPage/FavoritesPage.component";




export const appFrontRoutes: Routes = [
{
  path: '',
  component: AppFrontLayoutComponent,
  children:[
    {
      path:'',
      component: HomePageComponent
    },
    {
      path:'genre/:genre',
      component: CategoryPageComponent
    },
    {
      path:'game/:id',
      component: GamePageComponent
    },
    {
      path:'favorites',
      component: FavoritesPageComponent
    },
  {
    path: '**',
    component: NotFoundPageComponent
  },
  ],
},
{
  path:'**',
  redirectTo: '',
},
];


export default appFrontRoutes;
