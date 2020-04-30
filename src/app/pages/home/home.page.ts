import { Component, OnInit } from '@angular/core';
import { MenuController, Platform, LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SearchFilterPage } from '../modal/search-filter/search-filter.page';
import { AllService } from 'src/app/share/service/all.service';
import { Items } from 'src/app/share/model/items.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  isLoading = false;
  subscription: any;
  image: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  icon: string;
  url: string;
  category: string;

  searchValue = '';
  constructor(public service: AllService,
              private menuController: MenuController,
              private router: Router ,
              private platform: Platform ,
              private loadingController: LoadingController,
              public modalCtrl: ModalController) { }

  ngOnInit() {
    this.readItems();
  }
  readItems() {
    this.present();
    this.service.getItems().subscribe((res: Items[]) => {
      this.service.listItems = res;
    }, err => {
    });
  }

  readName(n) {
    this.present();
    const objName = {
      name: n
    };
    const jsonName = JSON.stringify(objName); // create json
    this.service.postName(jsonName).subscribe((res: Items[]) => {
      this.service.listItems = res;
    }, err => {
    });
  }

  readCategory(c) {
    this.present();
    const objCategory = {
      category: c
    };
    const jsonCategory = JSON.stringify(objCategory); // create json
    this.service.postCategory(jsonCategory).subscribe((res: Items[]) => {
      this.service.listItems = res;
    }, err => {
    });
  }
  /*async delay(ms: number) {
    this.openLoading();
    await new Promise(resolve => setTimeout(
        () => resolve(), ms)).then(
        () => this.closeLoading());
  }
  */
 async present() {
  this.isLoading = true;
  return await this.loadingController.create({
    message: 'Please wait...',
    // duration: 5000,
  }).then(a => {
    a.present().then(() => {
      console.log('presented');
      if (this.isLoading) {
        a.dismiss().then(() => console.log('abort presenting'));
      }
    });
  });
}

async dismiss() {
  this.isLoading = false;
  return await this.loadingController.dismiss().then(() => console.log('dismissed'));
}


  async openLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      // duration: 3000
    });
    await loading.present().then(() => console.log('open loading...'));
  }

  async closeLoading() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('close loading...'));
  }

  selectMenu(value) {
    console.log(value);
    this.readCategory(value);
    this.menuController.close(); // close menu
  }

  search() {
    console.log(this.searchValue);
    if (this.searchValue !== '') {
      this.readName(this.searchValue);
    }
  }
  async searchFilter() {
    const modal = await this.modalCtrl.create({
      component: SearchFilterPage
    });
    return await modal.present();
  }

  async openMenu() {
    return await this.menuController.open();
  }

  redirect(pagename: string) {
    this.router.navigate([pagename]);
  }
  // ปิด app เมื่อกดปุ่ม back button
  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
         // tslint:disable-next-line:no-string-literal
         navigator['app'].exitApp();
    });
  }
  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
  // end function ปิด app เมื่อกดปุ่ม back button
}
