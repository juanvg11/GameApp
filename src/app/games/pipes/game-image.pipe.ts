import { Pipe, PipeTransform } from '@angular/core';
import { environments } from 'src/environments/environments';


const baseUrl = environments.baseUrl;

@Pipe({
  name: 'gameImage',
})
export class GameImagePipe implements PipeTransform {
  transform(value: null | string | string[]): string {



    if (value === null) {
      return '/images/no-image.jpg';
    }

    if( typeof value === 'string' && value.startsWith('blob:')) {
      return value;

    }

    if (typeof value === 'string') {
      return `${value}`;
    }

    const image = value.at(0);

    if (!image) {
      return '/images/no-image.jpg';
    }

    return `${image}`;
  }
}

