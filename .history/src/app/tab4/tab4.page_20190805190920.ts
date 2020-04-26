import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  subscription: any;
  constructor(private platform: Platform) { }

  ngOnInit() {
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
