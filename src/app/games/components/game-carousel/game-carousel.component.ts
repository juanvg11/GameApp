import { A11yEvents } from './../../../../../node_modules/swiper/types/modules/a11y.d';
import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import { GameImagePipe } from '@games/pipes/game-image.pipe';

// import Swiper JS
import Swiper from 'swiper';
// import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';


@Component({
  selector: 'game-carousel',
  imports: [GameImagePipe],
  templateUrl: './game-carousel.component.html',
  styles: `
  .swiper {
    width: 100%;
    height: 500px;
  }
  `


})
export class GameCarouselComponent implements AfterViewInit{


  images = input.required<string[]>()
  swiperDiv = viewChild.required<ElementRef>('swiperDiv')

  ngAfterViewInit(): void {
    const element = this.swiperDiv().nativeElement
    if(!element) return

    const swiper = new Swiper(element, {
      // Optional parameters
      direction: 'horizontal',
      loop: true,

      modules: [
        Navigation, Pagination
      ],

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }
}


