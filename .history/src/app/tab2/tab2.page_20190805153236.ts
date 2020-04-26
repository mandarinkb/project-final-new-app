import { Component, ViewChild, OnInit  } from '@angular/core';
import { AllService } from '../share/service/all.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  // @ViewChild('lineCanvas', { static: true }) lineCanvas;
  // @ViewChild('lineCanvas') lineCanvas ;
  leagueLogo = true;
  leagueName: string;
  emptyComponent: boolean;
  teamObj: any;
  today: string;
  statusScore: string;
  constructor(private service: AllService) {}
  ngOnInit() {
    this.today = new Date().toISOString();
    this.leagueName = 'thaipremierleague';
    this.readFixtures(this.leagueName, this.today);
  }
  onChangeDate() {
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
      console.log(this.teamObj);
      // กรณีที่ไม่มีข้อมูลให้ พิมพ์ข้อความว่าไม่พบข้อมูลดังกล่าว
      if (res.length === 0) {
        this.emptyComponent = true;
      }
    }, err => {
      this.emptyComponent = true;
    });
  }
}
