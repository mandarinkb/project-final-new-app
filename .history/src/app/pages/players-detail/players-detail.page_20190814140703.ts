import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { AllService } from 'src/app/share/service/all.service';
@Component({
  selector: 'app-players-detail',
  templateUrl: './players-detail.page.html',
  styleUrls: ['./players-detail.page.scss'],
})
export class PlayersDetailPage implements OnInit {
  @ViewChild('lineCanvas', { static: true }) lineCanvas;
  lineChart: any;

  inputLabel = ['2019', '2018', '2017', '2016', '2015'];
  inputData = [9.32, 7.61, 8.03, 7.58, 8.23];

  labelName = 'ฟอร์มการเล่นแต่ละฤดูกาล';
  img = 'assets/img/Prasit_Padungchok.jpg';
  player: string;
  playDetail: any;
  playerName: string;
  league: string;
  position: string;

  pkComponent: boolean;

  pkPlayerObj: any;
  otherPlayerObj: any;

  label = new Array();
  data = new Array();
  constructor(private route: ActivatedRoute,
              private service: AllService) { }

  ngOnInit() {
    this.player = this.route.snapshot.paramMap.get('player');
    console.log(this.player);
    const splitted = this.player.split('|');
    this.playerName = splitted[0];
    this.league = splitted[1];
    this.position = splitted[2];
    if (this.position === 'ผู้รักษาประตู') {
      this.pkComponent = true;
    } else {
      this.pkComponent = false;
    }
    this.readPlayersDetail(this.league, this.playerName);
    this.readPerformanceDetail(this.league, this.playerName, this.position);
    this.lineChartMethod();
  }
  readPlayersDetail(inputLeague, inputPlayer) {
    // สร้าง Json
    const objForm = {
      league: inputLeague,
      player: inputPlayer
    };
    const jsonForm = JSON.stringify(objForm);
    this.service.postPlayersDetail(jsonForm).subscribe((res: any) => {
      this.playDetail = res;
    }, err => {
      console.log(err);
    });
  }
  readPerformanceDetail(inputLeague, inputPlayer, inputPosition) {
    // สร้าง Json
    const objForm = {
      league: inputLeague,
      player: inputPlayer,
      position: inputPosition
    };
    const jsonForm = JSON.stringify(objForm);
    this.service.postPerformanceDetail(jsonForm).subscribe((res: any) => {
      if (this.position === 'ผู้รักษาประตู') {
        this.pkPlayerObj = res;
        this.getStatistics(this.pkPlayerObj);
      } else {
        this.otherPlayerObj = res;
        this.getStatistics(this.otherPlayerObj);
      }
    }, err => {
      console.log(err);
    });
  }
  getStatistics(obj) {
    let count = 0;
    for (const item of obj) {
      if (count < 5) {
        this.label.push(item.season);
        this.data.push(item.average_statistics);
      }
      count++;
    }
    console.log(this.label);
    console.log(this.data);
  }

  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.inputLabel,
        datasets: [
          {
            label: this.label,
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
            data: this.data,
            spanGaps: false,
          }
        ]
      }
    });
  }
}
