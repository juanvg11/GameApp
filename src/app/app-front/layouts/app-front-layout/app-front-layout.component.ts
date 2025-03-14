import { Component } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { FrontNavbarComponent } from '../../components/front-navbar/front-navbar.component';

@Component({
  selector: 'app-app-front-layout',
  imports: [RouterOutlet, FrontNavbarComponent],
  templateUrl: './app-front-layout.component.html',
})
export class AppFrontLayoutComponent { }
