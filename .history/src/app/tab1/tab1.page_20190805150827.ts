import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AllService } from '../share/service/all.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy, AfterViewInit {
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

  // exit app on back press
  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      // tslint:disable-next-line:no-string-literal
      navigator['app'].exitApp();
    });
  }
  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
  // End exit app on back press

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
}
