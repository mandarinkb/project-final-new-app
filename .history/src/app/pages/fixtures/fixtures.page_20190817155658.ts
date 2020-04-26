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
  avgHome = '9.8';
  avgAway = '8.25';
  avgTeamObj: any;

  id: string;
  homeAwayObj: any;
  league;
  homeAway;

  season: any;
  constructor(private route: ActivatedRoute,
              private service: AllService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    // split
    const splitted = this.id.split('T');
    this.homeAway = splitted[0];
    this.league = splitted[1];
    this.readPreviousResults(this.league, this.homeAway);
    this.readAvgTeam(this.league, this.homeAway);
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

  readAvgTeam(inputLeague, inputHomeAway){
    // สร้าง Json
    const objForm = {
      league: inputLeague,
      home_away: inputHomeAway
    };
    const jsonForm = JSON.stringify(objForm);
    this.service.postAvgTeam(jsonForm).subscribe((res: any) => {
      this.avgTeamObj = res;
      this.season = [res.season];
      console.log(this.season);
    }, err => {
      console.log(err);
    });

  }
barChartMethod() {
  this.barChart = new Chart(this.barCanvas.nativeElement, {
    type: 'bar',
    data: {
      // labels: ['BJP'],
      labels: this.season,
      datasets: [{
        label: '1',
        data: [9.2],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1
      },
      {
        label: '2',
        data: [8.6],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
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
