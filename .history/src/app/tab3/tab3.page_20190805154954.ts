import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  league = true;
  constructor() {}
  onChoose($event) {
    console.log($event.target.value);
  }
  onChangeLeague($event) {
    if ($event.target.value === 'premierleague') {
        this.league = false;
    } else {
        this.league = true;
    }
  }
}
