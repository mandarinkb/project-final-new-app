import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AllService } from '../share/service/all.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit { 
  backButtonSubscription;
  subscription: any;
  leagueLogo = true;
  leagueName: string;

  today: string;
  statusScore: string;

  teamObj: any;
  emptyComponent: boolean;

  constructor(private platform: Platform,
              private service: AllService) {}
  ngOnInit() {
    this.today = new Date().toISOString();
    this.leagueName = 'thaipremierleague';
    this.readResults(this.leagueName, this.today);
   }

  onChangeLeague($event) {
    if ($event.target.value === 'premierleague') {
        this.leagueLogo = false;
        this.leagueName = 'premierleague';
    } else {
        this.leagueLogo = true;
        this.leagueName = 'thaipremierleague';
    }
    this.readResults(this.leagueName, this.today);
  }
  onChangeDate() {
    this.readResults(this.leagueName, this.today);
  }

  readResults(inputLeague , inputDate) {
    this.emptyComponent = false;
    // สร้าง Json
    const objForm = {
      league: inputLeague,
      date: inputDate
    };
    const jsonForm = JSON.stringify(objForm);
    // call service
    this.service.postResult(jsonForm).subscribe((res: any) => {
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
           navigator['app'].exitApp();
      });
    }
    ionViewWillLeave() {
      this.subscription.unsubscribe();
    }
    // end function ปิด app เมื่อกดปุ่ม back button
}
