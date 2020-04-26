import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AllService } from '../share/service/all.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  subscription: any;
  league = true;
  leagueName: string;
  typeTable: string;
  teamObj: any;
  constructor(private platform: Platform,
              private service: AllService) {}
  ngOnInit() {
    this.typeTable = 'all_table';
    this.leagueName = 'thaipremierleague';
  }
  onChangeTable($event) {
    this.typeTable = $event.target.value;
  }
  onChangeLeague($event) {
    if ($event.target.value === 'premierleague') {
        this.league = false;
        this.leagueName = 'premierleague';
    } else {
        this.league = true;
        this.leagueName = 'thaipremierleague';
    }
  }

  readLeagueTable(inputleagueName, inputTypeTable) {
    // สร้าง Json
    const objForm = {
      league: inputleagueName,
      type_table: inputTypeTable
    };
    const jsonForm = JSON.stringify(objForm);
    this.service.postLeagueTable(jsonForm).subscribe((res: any) => {
      this.teamObj = res;
    }, err => {
       console.log();
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
