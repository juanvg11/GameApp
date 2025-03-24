import { Component, output } from '@angular/core';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
})
export class SearchComponent {

value = output<string>()


}
