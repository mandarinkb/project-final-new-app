import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  subscription: any;
  league = true;
  constructor(private platform: Platform) {}
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

    // ปิด app เมื่อกดปุ่ม back button
    ionViewDidEnter() {
      this.subscription = this.platform.backButton.subscribe(() => {
           // tslint:disable-next-line:no-string-literal
           navigator['app'].exitApp();
      });
    }
    ionViewWillLeave() {
      this.subscription.unsubscribe();
    }
    // end function ปิด app เมื่อกดปุ่ม back button
}
