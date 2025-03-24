import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
})
export class SearchComponent {

onsearch(value:string){
console.log(value)
}

}
