import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { AllService } from 'src/app/share/service/all.service';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.page.html',
  styleUrls: ['./fixtures.page.scss'],
})
export class FixturesPage implements OnInit {
  @ViewChild('barCanvas', { static: true }) barCanvas;
  barChart: any;
  // @ViewChild('lineCanvas', { static: true }) lineCanvas;
  // lineChart: any;

/*
  inputLabel = ['2019', '2018', '2017', '2016', '2015'];
  inputData = [9.32, 7.61, 8.03, 7.58, 8.23];
  inputData2 = [8.1, 7.5, 7.4, 9.1, 7.5];

  labelName = 'เอสซีจี เมืองทอง ยูไนเต็ด';
  labelName2 = 'พีที ประจวบ เอฟซี';
*/
  avgHome = '9.8';
  avgAway = '8.25';
  avgTeam: any;

  id: string;
  homeAwayObj: any;
  league;
  homeAway;
  constructor(private route: ActivatedRoute,
              private service: AllService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    // split
    const splitted = this.id.split('T');
    this.homeAway = splitted[0];
    this.league = splitted[1];

    // this.lineChartMethod();
    this.readPreviousResults(this.league, this.homeAway);

    // document.body.style.setProperty('--home', this.avgHome + '%');
    // document.body.style.setProperty('--away', this.avgAway + '%');

    this.barChartMethod();
    }
  readPreviousResults(inputLeague , inputHomeAway) {
    // สร้าง Json
    const objForm = {
      league: inputLeague,
      home_away: inputHomeAway
    };
    const jsonForm = JSON.stringify(objForm);
    this.service.postPreviousResult(objForm).subscribe((res: any) => {
      this.homeAwayObj = res;
    }, err => {
      console.log(err);
    });
  }
/*
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
*/

barChartMethod() {
  this.barChart = new Chart(this.barCanvas.nativeElement, {
    type: 'bar',
    data: {
      labels: ['BJP', 'INC'], //  ['BJP', 'INC', 'AAP', 'CPI', 'CPI-M', 'NCP']
      datasets: [{
        label: '1',
        data: [9.2, 8.4], // [9.2, 8.4, 6.4, 8.5, 7.3, 8.9]
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },
      {
        label: '2',
        data: [8.6, 7.2], // [8.6, 7.2, 7.1, 6.3, 8.0, 9.1]
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
}
