import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UrlService } from '../config/url.service';

@Injectable({
  providedIn: 'root'
})
export class AllService {

  constructor(private rootUrl: UrlService ,
              private http: HttpClient) { }
    // ผลบอล
    postResult(formData: any) {
      return this.http.post(this.rootUrl.rootURL + '/results', formData, this.rootUrl.httpOptions);
    }

    // ผลบอลย้อนหลัง
    postPreviousResult(formData: any) {
      return this.http.post(this.rootUrl.rootURL + '/previous-results', formData);
    }

    // โปรแกรมแข่งขัน
    postFixtures(formData: any) {
      return this.http.post(this.rootUrl.rootURL + '/fixtures', formData, this.rootUrl.httpOptions);
    }

    // ตารางคะแนน
    postLeagueTable(formData: any) {
      return this.http.post(this.rootUrl.rootURL + '/league-table', formData, this.rootUrl.httpOptions);
    }

    // ทีม
    postTeams(formData: any) {
      return this.http.post(this.rootUrl.rootURL + '/teams', formData, this.rootUrl.httpOptions);
    }

    // รายชื่อนักเตะในทีม
    postTeamsDetail(formData: any) {
      return this.http.post(this.rootUrl.rootURL + '/teams-detail', formData, this.rootUrl.httpOptions);
    }
    // โลโก้ทีมและชื่อทีม
    postTeamsLogo(formData: any) {
      return this.http.post(this.rootUrl.rootURL + '/team-logo', formData, this.rootUrl.httpOptions);
    }

    // รายชื่อนักเตะในทีม
    postPlayersDetail(formData: any) {
      return this.http.post(this.rootUrl.rootURL + '/players-detail', formData, this.rootUrl.httpOptions);
    }

    // รายระเอียดนักเตะในทีม
    postPerformanceDetail(formData: any) {
      return this.http.post(this.rootUrl.rootURL + '/performance-detail', formData, this.rootUrl.httpOptions);
    }

    // ค่าเฉลี่ยทีม
    postAvgTeam(formData: any) {
      return this.http.post(this.rootUrl.rootURL + '/avg-team', formData, this.rootUrl.httpOptions);
     }

    // วิเคราะห์ผลบอล
    postScoreAnalyze(formData: any) {
      return this.http.post(this.rootUrl.rootURL + '/score-analyze', formData, this.rootUrl.httpOptions);
     }
}
