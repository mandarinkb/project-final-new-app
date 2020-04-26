import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
  homeImg = 'assets/img/Muangthong-United.png';
  homeTeam = 'เอสซีจี เมืองทอง ยูไนเต็ด';
  league: string;

  leagueComponent: boolean;
  teams: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.league = this.route.snapshot.paramMap.get('league');
    console.log(this.league);
    if (this.league === 'thaipremierleague') {
       this.leagueComponent = true;
    }
    if (this.league === 'premierleague') {
      this.leagueComponent = false;
    }
    this.setTeam();
  }
  setTeam() {
    this.teams = [{
    team: 'เอสซีจี เมืองทอง ยูไนเต็ด',
    teamImage: 'assets/img/Muangthong-United.png'
  },
  {
    team: 'พีที ประจวบ เอฟซี',
    teamImage: 'assets/img/PT-Prachuap-FC.png'
  }
 ];
 }

}
