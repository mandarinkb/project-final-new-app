import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllService } from 'src/app/share/service/all.service';
@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.page.html',
  styleUrls: ['./team-detail.page.scss'],
})
export class TeamDetailPage implements OnInit {
  // homeImg = 'assets/img/Muangthong-United.png';
  // homeTeam = 'เอสซีจี เมืองทอง ยูไนเต็ด';
  players: any;
  team: string;
  teamObj: any;
  splitTeam: string;
  splitLeague: string;
  constructor(private route: ActivatedRoute,
              private service: AllService) { }

  ngOnInit() {
    this.team = this.route.snapshot.paramMap.get('team');
    console.log(this.team);
    const splitted = this.team.split('|');
    this.splitTeam = splitted[0];
    this.splitLeague = splitted[1];

    this.setTeamObj(this.team);
    this.setPlayer(this.team);
  }

  readTeamsDetail(inputLeague, inputTeam) {
    // สร้าง Json
    const objForm = {
      league: inputLeague,
      team: inputTeam
    };
    const jsonForm = JSON.stringify(objForm);
    this.service.postTeamsDetail(jsonForm).subscribe((res: any) => {
      this.players = res;
    }, err => {
      console.log(err);
    });
  }
  setTeamObj(inputTeam) {
        this.teamObj =  [{
        team: 'เอสซีจี เมืองทอง ยูไนเต็ด',
        teamImage: 'assets/img/Muangthong-United.png'
      }];
  }

  setPlayer(inputTeam) {
      this.players =  [{
        number: '28',
        img: 'assets/img/Prasit_Padungchok.jpg',
        name: 'ประสิทธิ์ ผดุงโชค',
        position: 'ผู้รักษาประตู'
      },
      {
        number: '11',
        img: 'assets/img/Adisak_Kraisorn.jpg',
        name: 'อดิศักดิ์ ไกรษร',
        position: 'กองหน้าตัวเป้า'
      }];
  }
}
