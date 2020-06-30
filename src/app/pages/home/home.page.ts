import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, Platform, LoadingController, ModalController, IonInfiniteScroll } from '@ionic/angular';
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
  subscription: any; // close app
  searchValue = '';
  modalValue: any = null;
  haveData: boolean;
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


  searchName: any = []; // ไว้เก็บค่า search ลง storage
  constructor(public service: AllService,
              private menuController: MenuController,
              private platform: Platform,
              private loadingController: LoadingController,
              public modalCtrl: ModalController,
              public storage: LocalStorageService) {
    this.haveData = true;
  }

  ngOnInit() {
    this.readItems(this.from);

  }
  // แปลงเป็น ทศนิยม 1 ตำแหน่ง
  str1decimal(str: string): string {
    if (str === '-') {
      return str;
    } else {
      return (Math.round(Number(str) * 100) / 100).toFixed(1);
    }
  }

  // ค้นหา item(หน้า home)
  readItems(fromValue) {
    this.isItem = true;
    this.isSearch = false;
    this.isSearchAndFilter = false;
    this.isMenu = false;
    this.service.getItems(fromValue).subscribe((res: Items[]) => {
      this.itemValue = this.itemValue.concat(res);  // เรียกมา add ใน item เรื่อยๆ
    }, err => {
      this.haveData = false;
    });
  }

  // ช่อง search
  // ประกาศเป็นแบบ async เพื่อใช้ await ได้
  async search() {
    // เพื่อให้ทำคำสั่ง await ก่อนแล้วทำคำสั่งอื่นต่อไป
    await this.storage.getStorage('search').then((data: any) => {
      this.searchName = data;
    });

    // fix bug
    if (this.searchName === null) {
      this.searchName = [];  // เซ็ทค่าเริ่มต้นลงไปเพื่อจะได้ไม่เกิด error กรณี this.searchName == null
    }

    if (this.searchName.length < 3) { // ถ้าข้อมูล history น้อยกว่า 3 รายการให้จัดเก็บเพิ่ม
      this.searchName = this.searchName.concat(this.searchValue);  // มารวมกับค่า search ปัจจุบัน
      this.storage.setStorage('search', this.searchName);
    } else if (this.searchName.length === 3) { // ถ้าข้อมูล history เท่ากับ 3 รายการ
      let searchItem = [];                     // ให้เอาข้อมูลตัวแรกออก แล้งจึงจัดเก็บเพิ่ม
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.searchName.length ; i++) {
        if (i !== 0) { // ตัดค่าแรกออก
          searchItem = searchItem.concat(this.searchName[i]);
        }
      }
      searchItem = searchItem.concat(this.searchValue); // มารวมกับค่า search ปัจจุบัน
      this.storage.setStorage('search', searchItem);
    }

    this.haveData = true;
    this.from = 0;
    this.itemValue = []; // reset ค่า item
    // กรณีช่อง search มีค่า
    if (this.searchValue !== '') {
      // กรณีใช้ filter
      if (this.modalValue !== null) {
        // รับค่าที่ได้รับมาจาก modal filter
        this.readNameAndFilter(this.searchValue, this.modalValue.web,
        this.modalValue.min, this.modalValue.max, this.from);
        this.searchValue = ''; // เคลียค่าในช่อง search
      } else {  // กรณีไม่ได้ใช้ filter
        this.readName(this.searchValue, this.from);
        this.searchValue = ''; // เคลียค่าในช่อง search
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
    this.service.postName(this.jsonName, fromValue).subscribe((res: Items[]) => {
      this.itemValue = this.itemValue.concat(res);
      // ค้นหาไม่พบให้แจ้งเตือน
      if (res.length === 0 && fromValue === 0) {
        this.haveData = false;
      }
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
    this.service.postNameAndFilter(this.jsonNameAndFilter, fromValue).subscribe((res: Items[]) => {
      this.itemValue = this.itemValue.concat(res);
      // ค้นหาไม่พบให้แจ้งเตือน
      if (res.length === 0 && fromValue === 0) {
        this.haveData = false;
      }
    }, err => {
      this.haveData = false;
    });
  }

  // เลือกเมนู
  selectMenu(value) {
    this.title = value;
    this.haveData = true;
    this.from = 0;
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
    const objCategory = {
      category: c
    };
    this.jsonCategory = JSON.stringify(objCategory); // create json
    this.service.postCategory(this.jsonCategory, fromValue).subscribe((res: Items[]) => {
      this.itemValue = this.itemValue.concat(res);
      // this.categoryData = res;
    }, err => {
      this.haveData = false;
    });
  }
  // modal search filter
  async searchFilter() {
    const modal = await this.modalCtrl.create({
      component: SearchFilterPage // อ้างอิงจาก modal filter
    });
    modal.onDidDismiss()
      .then((data) => {
        this.modalValue = data.data;  // เซ็ตค่าที่รับจาก modal search filter
      });
    return await modal.present();
  }

  // สำหรับ infinite-scroll
  loadData(event) {
    setTimeout(() => {
      console.log('infinite-scroll loading');
      // หน้าหลัก
      if (this.isItem) {
        this.from = this.from + this.addFrom;
        this.readItems(this.from);
        event.target.complete();
      // ค้นหา
      } else if (this.isSearch) {
        this.from = this.from + this.addFrom;
        const obj = JSON.parse(this.jsonName);
        this.readName(obj.name, this.from);
        event.target.complete();
        event.target.disabled = false;
      // ค้นหาโดยใช้ filter
      } else if (this.isSearchAndFilter) {
        this.from = this.from + this.addFrom;
        const obj = JSON.parse(this.jsonNameAndFilter);
        this.readNameAndFilter(obj.name, obj.webName, obj.minPrice, obj.maxPrice, this.from);
        event.target.complete();
      // เลือกหมวดหมู่
      } else if (this.isMenu) {
        this.from = this.from + this.addFrom;
        const obj = JSON.parse(this.jsonCategory);
        this.readCategory(obj.category, this.from);
        event.target.complete();
      }
    }, 1000);
  }
/*
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
*/
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
