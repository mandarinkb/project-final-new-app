import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllService } from 'src/app/share/service/all.service';
@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
  homeImg = 'assets/img/Muangthong-United.png';
  homeTeam = 'เอสซีจี เมืองทอง ยูไนเต็ด';
  league: string;
  leagueName: string;

  leagueComponent: boolean;
  teams: any;
  constructor(private route: ActivatedRoute,
              private service: AllService) { }

  ngOnInit() {
    this.league = this.route.snapshot.paramMap.get('league');
    console.log(this.league);
    if (this.league === 'ไทยลีก') {
       this.leagueName = 'thaipremierleague';
       this.leagueComponent = true;
    }
    if (this.league === 'พรีเมียร์ลีก') {
      this.leagueName = 'premierleague';
      this.leagueComponent = false;
    }
    this.readTeam(this.league );
  }

  readTeam(inputLeague) {
    // สร้าง Json
    const objForm = {
      league: inputLeague,
    };
    const jsonForm = JSON.stringify(objForm);
    this.service.postTeams(jsonForm).subscribe((res: any ) => {
      this.teams = res;
    }, err => {

    });
  }


}
