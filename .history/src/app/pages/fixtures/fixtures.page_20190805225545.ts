import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.page.html',
  styleUrls: ['./fixtures.page.scss'],
})
export class FixturesPage implements OnInit {
  @ViewChild('lineCanvas', { static: true }) lineCanvas;
  lineChart: any;

  inputLabel = ['2019', '2018', '2017', '2016', '2015'];
  inputData = [9.32, 7.61, 8.03, 7.58, 8.23];
  inputData2 = [8.1, 7.5, 7.4, 9.1, 7.5];

  labelName = 'เอสซีจี เมืองทอง ยูไนเต็ด';
  labelName2 = 'พีที ประจวบ เอฟซี';

  id: string;
  homeAwayObj: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.lineChartMethod();
  }

setObj() {
  this.homeAwayObj = [
    {
      dateThai: 'วันอาทิตย์ที่ 26 พฤศจิกายน 2560',
      homeImg: 'http://www.livesoccer888.com/images/teams/36x36/Southampton.png',
      homeScore: '4',
      awayImg: 'http://www.livesoccer888.com/images/teams/36x36/Everton.png',
      awayScore: '1'
    }
  ];
}

  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.inputLabel,
        datasets: [
          {
            label: this.labelName,
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.inputData,
            spanGaps: false,
          },
          {
            label: this.labelName2,
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(231, 117, 170, 0.8)',
            borderColor: 'rgba(231, 45, 162, 0.8)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(231, 45, 162, 0.8)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(231, 45, 162, 0.8)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.inputData2,
            spanGaps: false,
          }
        ]
      }
    });
  }
}
