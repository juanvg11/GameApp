import { A11yEvents } from './../../../../../node_modules/swiper/types/modules/a11y.d';
import { AfterViewInit, Component, ElementRef, input, OnChanges, SimpleChanges, viewChild } from '@angular/core';
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
export class GameCarouselComponent implements AfterViewInit, OnChanges{


  images = input.required<string[]>()
  swiperDiv = viewChild.required<ElementRef>('swiperDiv')

  swiper: Swiper | undefined = undefined


  ngOnChanges(changes: SimpleChanges): void {


    if(changes['images'].firstChange) {
     return
    }

    if(!this.swiper) return
    this.swiper.destroy(true, true)


    this.swiperInit()
  }


  ngAfterViewInit(): void {
    this.swiperInit()
  }

  swiperInit(){

    const element = this.swiperDiv().nativeElement
    if(!element) return

    this.swiper = new Swiper(element, {
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


