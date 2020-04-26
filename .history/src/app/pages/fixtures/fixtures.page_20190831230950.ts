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

  avgTeamObj: any;

  id: string;
  homeAwayObj: any;
  homeAwayComponent: boolean;
  league;
  homeAway;

  season: any;
  homeLabel: string;
  awayLabel: string;
  avgHome: string;
  avgAway: string;
  date: string;
  analyze: any;
  analyzeComponent: boolean;

  homeWin: number;
  awayWin: number;
  draw: number;

  home: string;
  away: string;
  constructor(private route: ActivatedRoute,
              private service: AllService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    // split
    const splitted = this.id.split('T');
    this.homeAway = splitted[0];
    this.league = splitted[1];
    this.date = splitted[2];
    this.readAvgTeam(this.league, this.homeAway);
    this.readScoreAnalyze(this.league, this.date, this.homeAway);
    this.readPreviousResults(this.league, this.homeAway);
    // document.body.style.setProperty('--home', this.avgHome + '%');
    // document.body.style.setProperty('--away', this.avgAway + '%');

    }
  readPreviousResults(inputLeague , inputHomeAway) {
    this.homeAwayComponent = false;
    // สร้าง Json
    const objForm = {
      league: inputLeague,
      home_away: inputHomeAway
    };
    const jsonForm = JSON.stringify(objForm);
    this.service.postPreviousResult(objForm).subscribe((res: any) => {
      this.homeAwayObj = res;
      if (res.length === 0) {
        this.homeAwayComponent = true;
      }

      this.homeWin = 0;
      this.awayWin = 0;
      this.draw = 0;
      this.getPreviousResults(res);
    }, err => {
      console.log(err);
    });
  }
  getPreviousResults(obj) {
    console.log(obj);
    for (const item of obj) {
      const home = Number(item.homeScore);
      const away = Number(item.awayScore);

      if (this.homeLabel === item.home) {
/*       if (home > away) {
          this.homeWin ++;
        }
        if (home < away) {
          this.awayWin ++;
        }
        if (home === away) {
          this.draw ++;
        }
        */
       console.log(this.homeLabel);
       console.log(item.home);
       console.log('hello home');
      }
      if (this.homeLabel === item.away) {
        console.log('hello away');
      }


    }
    console.log('home : ' + this.homeWin);
    console.log('away : ' + this.awayWin);
    console.log('draw : ' + this.draw);
  }

  readAvgTeam(inputLeague, inputHomeAway) {
    // สร้าง Json
    const objForm = {
      league: inputLeague,
      home_away: inputHomeAway
    };
    const jsonForm = JSON.stringify(objForm);
    this.service.postAvgTeam(jsonForm).subscribe((res: any) => {
      this.avgTeamObj = res;
      this.getAvgTeam(res);
      this.barChartMethod();
    }, err => {
      console.log(err);
    });
  }
  getAvgTeam(obj) {
    for (const item of obj) {
      this.season =  item.season;
      this.homeLabel = item.home;
      this.awayLabel = item.away;
      this.avgHome = item.home_avg;
      this.avgAway = item.away_avg;
    }
  }

  readScoreAnalyze(inputLeague, inputdate, inputHomeAway) {
    this.analyzeComponent = false;
    // สร้าง Json
    const objForm = {
      league: inputLeague,
      home_away: inputHomeAway,
      date: inputdate
    };
    const jsonForm = JSON.stringify(objForm);
    this.service.postScoreAnalyze(jsonForm).subscribe((res: any) => {
      // console.log(res);
      this.analyze = res;

      if (res.length === 0) {
        this.analyzeComponent = true;
      }
    }, err => {
      console.log(err);
      // this.analyzeComponent = true;
    });
  }
barChartMethod() {
  this.barChart = new Chart(this.barCanvas.nativeElement, {
    type: 'bar',
    data: {
      // labels: ['BJP'],
      labels: [this.season],
      datasets: [{
        label: this.homeLabel,
        data: [this.avgHome],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1
      },
      {
        label: this.awayLabel,
        data: [this.avgAway],
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
