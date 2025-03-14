import { Pipe, PipeTransform } from '@angular/core';
import { environments } from 'src/environments/environments';


const baseUrl = environments.baseUrl;

@Pipe({
  name: 'gameImage',
})
export class GameImagePipe implements PipeTransform {
  transform(value: string | string[]): string {
    if (typeof value === 'string') {
      return `${baseUrl}/images/${value}`;
    }

    const image = value.at(0);

    if (!image) {
      return '/images/no-image.jpg';
    }

    return `${baseUrl}/images/${image}`;
  }
}

