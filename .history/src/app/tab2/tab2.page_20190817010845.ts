import { Component, OnInit  } from '@angular/core';
import { AllService } from '../share/service/all.service';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  thailandTime = new Date().toLocaleString('en-US', {timeZone: 'Asia/Bangkok'});
  leagueLogo = true;
  leagueName: string;
  emptyComponent: boolean;
  teamObj: any;
  today: string;
  statusScore: string;
  subscription: any;
  constructor(private service: AllService,
              private platform: Platform) {}
  ngOnInit() {
    this.today = new Date().toISOString(); // Date().toISOString()
    console.log(this.today);
    this.leagueName = 'thaipremierleague';
    this.readFixtures(this.leagueName, this.today);
  }
  onChangeDate() {
    this.readFixtures(this.leagueName, this.today);
  }
  onChangeLeague($event) {
    if ($event.target.value === 'premierleague') {
        this.leagueLogo = false;
        this.leagueName = 'premierleague';
    } else {
        this.leagueLogo = true;
        this.leagueName = 'thaipremierleague';
    }
    this.readFixtures(this.leagueName, this.today);
  }
  readFixtures(inputLeague , inputDate) {
    this.emptyComponent = false;
    // สร้าง Json
    const objForm = {
      league: inputLeague,
      date: inputDate
    };
    const jsonForm = JSON.stringify(objForm);
    // call service
    this.service.postFixtures(jsonForm).subscribe((res: any) => {
      this.teamObj = res;
      // กรณีที่ไม่มีข้อมูลให้ พิมพ์ข้อความว่าไม่พบข้อมูลดังกล่าว
      if (res.length === 0) {
        this.emptyComponent = true;
      }
    }, err => {
      this.emptyComponent = true;
    });
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
