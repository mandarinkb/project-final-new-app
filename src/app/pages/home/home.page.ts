import { Component, OnInit } from '@angular/core';
import { MenuController, Platform, LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SearchFilterPage } from '../modal/search-filter/search-filter.page';
import { AllService } from 'src/app/share/service/all.service';
import { Items } from 'src/app/share/model/items.model';
import { LocalStorageService } from 'src/app/share/service/local-storage.service';

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

  modalValue: any = null;
  constructor(public service: AllService,
              private menuController: MenuController,
              private router: Router,
              private platform: Platform,
              private loadingController: LoadingController,
              public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.readItems();
  }
  readItems() {
    this.openloading();
    this.service.getItems().subscribe((res: Items[]) => {
      this.service.listItems = res;
      this.closeloading();
    }, err => {
      this.closeloading();
    });
  }

  readName(n) {
    this.openloading();
    const objName = {
      name: n
    };
    const jsonName = JSON.stringify(objName); // create json
    this.service.postName(jsonName).subscribe((res: Items[]) => {
      this.service.listItems = res;
      this.isLoading = true;
      this.closeloading();
    }, err => {
      this.closeloading();
    });
  }

  readNameAndFilter(n, wn, mi, ma) {
    this.openloading();
    const objName = {
      name: n,
      webName: wn,
      minPrice: mi,
      maxPrice: ma
    };
    const jsonName = JSON.stringify(objName); // create json
    this.service.postNameAndFilter(jsonName).subscribe((res: Items[]) => {
      this.service.listItems = res;
      this.closeloading();
    }, err => {
      this.closeloading();
    });
  }

  readCategory(c) {
    this.openloading();
    const objCategory = {
      category: c
    };
    const jsonCategory = JSON.stringify(objCategory); // create json
    this.service.postCategory(jsonCategory).subscribe((res: Items[]) => {
      this.service.listItems = res;
      this.closeloading();
    }, err => {
      this.closeloading();
    });
  }

  async openloading() {
    this.isLoading = true;
    return await this.loadingController.create({
      message: 'Please wait...',
      // duration: 5000,
    }).then(data => {
      data.present().then(() => {
        console.log('open loading');
        if (!this.isLoading) {
          data.dismiss().then(() => console.log('close loading'));
        }
      });
    });
  }

  async closeloading() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

  selectMenu(value) {
    this.readCategory(value);
    this.menuController.close(); // close menu
  }

  search() {
    if (this.searchValue !== '') {
      // กรณีใช้ filter
      if (this.modalValue !== null) {
        console.log('on filter');
        this.readNameAndFilter(this.searchValue, this.modalValue.web,
          this.modalValue.min, this.modalValue.max);
      } else {  // กรณีไม่ได้ใช้ filter
        console.log('off filter');
        this.readName(this.searchValue);
      }
    } else {
      this.readItems();
    }
    this.modalValue = null;
  }

  async searchFilter() {
    const modal = await this.modalCtrl.create({
      component: SearchFilterPage

    });
    modal.onDidDismiss()
      .then((data) => {
        this.modalValue = data.data;  // เซ็ตค่าที่รับจาก modal
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
