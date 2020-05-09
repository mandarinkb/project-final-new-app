import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, Platform, LoadingController, ModalController, IonInfiniteScroll } from '@ionic/angular';
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
  subscription: any; // close app
  searchValue = '';
  modalValue: any = null;
  haveData: boolean;
  // maxFrom: number;
  from = 0;
  addFrom = 50; // เพิ่มทีละ 50 รายการ
  itemValue = [];
  isItem = false;
  isSearch = false;
  isSearchAndFilter = false;
  isMenu = false;
  jsonName: any;
  jsonNameAndFilter: any;
  jsonCategory: any;

  categoryData: any;
  title = 'สินค้าลดราคา';
  // เอาไว้เช็คเวลาทำงานครั้งแรก
  // isFirstSearch = true;
  // isFirstFilterSearch = true;
  constructor(public service: AllService,
              private menuController: MenuController,
              private platform: Platform,
              private loadingController: LoadingController,
              public modalCtrl: ModalController) {
    this.haveData = true;
  }

  ngOnInit() {
    this.readItems(this.from);
    // this.readCountItems();
  }

  // ค้นหา item(หน้า home)
  readItems(fromValue) {
    this.isItem = true;
    this.isSearch = false;
    this.isSearchAndFilter = false;
    this.isMenu = false;
    // this.openloading();
    this.service.getItems(fromValue).subscribe((res: Items[]) => {
      this.itemValue = this.itemValue.concat(res);  // เรียกมา add ใน item เรื่อยๆ
      // เช็คกรณีไม่พบข้อมูล
      /*if (res.length === 0) {
        this.haveData = false;
      }
      */
    }, err => {
      this.haveData = false;
    });
  }

  // ช่อง search
  search() {
    this.haveData = true;
    this.from = 0;
    // this.maxFrom = 0;
    this.itemValue = []; // reset ค่า item
    // กรณีช่อง search มีค่า
    if (this.searchValue !== '') {
      // กรณีใช้ filter
      if (this.modalValue !== null) {
        console.log('on filter');
        this.readNameAndFilter(this.searchValue, this.modalValue.web,
          this.modalValue.min, this.modalValue.max, this.from);
      } else {  // กรณีไม่ได้ใช้ filter
        console.log('off filter');
        this.readName(this.searchValue, this.from);
      }
    } else { // กรณีช่อง search ไม่มีค่า
      this.readItems(0);  // ค่าเริ่มต้น
    }
    this.modalValue = null;
  }

  // search by name
  readName(n, fromValue) {
    this.isItem = false;
    this.isSearch = true;
    this.isSearchAndFilter = false;
    this.isMenu = false;
    const objName = {
      name: n
    };
    this.jsonName = JSON.stringify(objName); // create json
    // this.readCountName(this.jsonName); // นับ search by name
    this.service.postName(this.jsonName, fromValue).subscribe((res: Items[]) => {
      this.itemValue = this.itemValue.concat(res);
      // เช็คกรณีไม่พบข้อมูล
      /*if (res.length === 0) {
        this.haveData = false;
      }
      */
    }, err => {
      this.haveData = false;
    });
  }

  // search by name และใช้ filter search
  readNameAndFilter(n, wn, mi, ma, fromValue) {
    this.isItem = false;
    this.isSearch = false;
    this.isSearchAndFilter = true;
    this.isMenu = false;
    const objName = {
      name: n,
      webName: wn,
      minPrice: mi,
      maxPrice: ma
    };
    this.jsonNameAndFilter = JSON.stringify(objName); // create json
    // this.readCountNameAndFilter(this.jsonNameAndFilter); // นับ search by name and filter
    this.service.postNameAndFilter(this.jsonNameAndFilter, fromValue).subscribe((res: Items[]) => {
      this.itemValue = this.itemValue.concat(res);
      // เช็คกรณีไม่พบข้อมูล
      /*if (res.length === 0) {
        this.haveData = false;
      }
      */
    }, err => {
      this.haveData = false;
    });
  }

  // เลือกเมนู
  selectMenu(value) {
    this.title = value;
    this.haveData = true;
    this.from = 0;
    // this.maxFrom = 0;
    this.itemValue = []; // reset ค่า item
    this.readCategory(value, this.from);
    this.menuController.close(); // close menu
  }

  // search by menu
  readCategory(c, fromValue) {
    this.isItem = false;
    this.isSearch = false;
    this.isSearchAndFilter = false;
    this.isMenu = true;
    // this.openloading();
    const objCategory = {
      category: c
    };
    this.jsonCategory = JSON.stringify(objCategory); // create json
    // this.readCountCategory(this.jsonCategory); // นับ menu
    this.service.postCategory(this.jsonCategory, fromValue).subscribe((res: Items[]) => {
      this.itemValue = this.itemValue.concat(res);
      this.categoryData = res;
      // เช็คกรณีไม่พบข้อมูล
      /*if (res.length === 0) {
        this.haveData = false;
      }
      */
    }, err => {
      this.haveData = false;
    });
  }
/*
  // นับ item(หน้า home)
  readCountItems() {
    this.service.getcountItems().subscribe((res: Items[]) => {
      for (const data of res) {
        this.maxFrom = data.count;
      }
    }, err => {
    });
  }

  // นับ menu
  readCountCategory(c) {
    setTimeout(() => {
      this.service.postCountCategory(c).subscribe((res: Items[]) => {
        for (const data of res) {
          this.maxFrom = data.count;
        }
      }, err => {
      });
    }, 1000);
  }

  // นับ search by name
  readCountName(n) {
    this.service.postCountName(n).subscribe((res: Items[]) => {
      for (const data of res) {
        this.maxFrom = data.count;
      }
    }, err => {
    });
  }

  // นับ search by name and filter
  readCountNameAndFilter(nf) {
    this.service.postCountNameAndFilter(nf).subscribe((res: Items[]) => {
      for (const data of res) {
        this.maxFrom = data.count;
      }
    }, err => {
    });
  }
*/
  // modal search filter
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

  // สำหรับ infinite-scroll
  loadData(event) {
    setTimeout(() => {
      console.log('infinite-scroll loading');
      if (this.isItem) {
        this.from = this.from + this.addFrom;
        this.readItems(this.from);
        event.target.complete();
        /*if (this.from > this.maxFrom) {
          event.target.disabled = true;
        }
        */
      } else if (this.isSearch) {
        this.from = this.from + this.addFrom;
        const obj = JSON.parse(this.jsonName);
        this.readName(obj.name, this.from);
        event.target.complete();
        /*if (this.from > this.maxFrom) {
          event.target.disabled = true;
        }
        */
      } else if (this.isSearchAndFilter) {
        this.from = this.from + this.addFrom;
        const obj = JSON.parse(this.jsonNameAndFilter);
        this.readNameAndFilter(obj.name, obj.webName, obj.minPrice, obj.maxPrice, this.from);
        event.target.complete();
        /*if (this.from > this.maxFrom) {
          event.target.disabled = true;
        }
        */
      } else if (this.isMenu) {
        this.from = this.from + this.addFrom;
        const obj = JSON.parse(this.jsonCategory);
        this.readCategory(obj.category, this.from);
        event.target.complete();
        /*if (this.from > this.maxFrom) {
          event.target.disabled = true;
        }
        */
      }
    }, 1000);

  }

  // pop up loading
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
  // close pop up loading

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
