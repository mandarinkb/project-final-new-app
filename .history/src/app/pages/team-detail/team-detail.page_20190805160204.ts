import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.page.html',
  styleUrls: ['./team-detail.page.scss'],
})
export class TeamDetailPage implements OnInit {
  homeImg = 'assets/img/Muangthong-United.png';
  homeTeam = 'เอสซีจี เมืองทอง ยูไนเต็ด';
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
    if (inputTeam === 'เอสซีจี เมืองทอง ยูไนเต็ด') {
        this.teamObj =  [{
        team: 'เอสซีจี เมืองทอง ยูไนเต็ด',
        teamImage: 'assets/img/Muangthong-United.png'
      }];
    }
    if (inputTeam === 'พีที ประจวบ เอฟซี') {
        this.teamObj =  [{
        team: 'พีที ประจวบ เอฟซี',
        teamImage: 'assets/img/PT-Prachuap-FC.png'
      }];
    }
  }

  setPlayer(inputTeam) {
    if (inputTeam === 'เอสซีจี เมืองทอง ยูไนเต็ด') {
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
    if (inputTeam === 'พีที ประจวบ เอฟซี') {
      this.players =  [{
        number: '39',
        img: 'assets/img/Siwapong_Pankaew.jpg',
        name: 'สิวะพงศ์ พานแก้ว',
        position: 'ผู้รักษาประตู'
      },
      {
        number: '19',
        img: 'assets/img/Rawee_Udomsilp.jpg',
        name: 'รวี อุดมศิลป์',
        position: 'กองหน้าตัวเป้า'
      }];

    }
  }
}
