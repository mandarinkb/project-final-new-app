import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  searchKey = '';
  constructor(private menuController: MenuController ) { }

  ngOnInit() {
  }

async openMenu() {
  return await this.menuController.open();
}


}
