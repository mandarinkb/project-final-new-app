import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.team = this.route.snapshot.paramMap.get('team');
    console.log(this.team);
    this.setTeamObj(this.team);
    this.setPlayer(this.team);
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
