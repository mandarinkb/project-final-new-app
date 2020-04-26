import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  subscription: any;
  league = true;

  typeTable: string;
  constructor(private platform: Platform) {}
  ngOnInit() {
    this.typeTable = 'all_table';
  }
  onChangeTable($event) {
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
