import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.page.html',
  styleUrls: ['./fixtures.page.scss'],
})
export class FixturesPage implements OnInit {

  lineChart: any;

  inputLabel = ['2019', '2018', '2017', '2016', '2015'];
  inputData = [9.32, 7.61, 8.03, 7.58, 8.23];
  inputData2 = [8.1, 7.5, 7.4, 9.1, 7.5];

  labelName = 'เอสซีจี เมืองทอง ยูไนเต็ด';
  labelName2 = 'พีที ประจวบ เอฟซี';

  homeImg = 'assets/img/Muangthong-United.png';
  awayImg = 'assets/img/PT-Prachuap-FC.png';
  id: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
