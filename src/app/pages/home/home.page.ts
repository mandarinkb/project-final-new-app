import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, Platform, LoadingController, ModalController, IonInfiniteScroll } from '@ionic/angular';
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
  haveData = true;

  subscription: any; // close app
  searchValue = '';
  modalValue: any = null;

  from = 0;
  addFrom = 50; // เพิ่มทีละ 50 รายการ
  itemValue = [];

  // เอาไว้เช็คตอนใช้ infinite-scroll
  isItem = false;
  isSearch = false;
  isSearchAndFilter = false;
  isMenu = false;

  jsonName: any;
  jsonNameAndFilter: any;
  jsonCategory: any;
  categoryData: any;
  title = 'สินค้าลดราคา';

  historySearch: any = []; // ไว้เก็บค่า search ลง storage
  constructor(public service: AllService,
              private menuController: MenuController,
              private platform: Platform,
              public modalCtrl: ModalController,
              public storage: LocalStorageService) {}

  ngOnInit() {
    this.readHistory(this.from);
  }
  // แปลงเป็น ทศนิยม 1 ตำแหน่ง
  str1decimal(str: string): string {
    if (str === '-') {
      return str;
    } else {
      return (Math.round(Number(str) * 100) / 100).toFixed(1);
    }
  }

  // ประกาศเป็นแบบ async เพื่อใช้ await ได้
  async keepHistory() {
    // เพื่อให้ทำคำสั่ง await ก่อนแล้วทำคำสั่งอื่นต่อไป
    await this.storage.getStorage('search').then((data: any) => {
      this.historySearch = data;
    });
    // fix bug
    if (this.historySearch === null) {
      this.historySearch = [];  // เซ็ทค่าเริ่มต้นลงไปเพื่อจะได้ไม่เกิด error กรณี this.searchName == null
    }
    if (this.historySearch.length < 3) { // ถ้าข้อมูล history น้อยกว่า 3 รายการให้จัดเก็บเพิ่ม
      // ถ้าช่อง search ไม่ใช่ว่าง ให้เก็บข้อมูล
      if (this.searchValue !== '') {
        this.historySearch = this.historySearch.concat(this.searchValue);  // มารวมกับค่า search ปัจจุบัน
        this.storage.setStorage('search', this.historySearch);
      }
    } else if (this.historySearch.length === 3) { // ถ้าข้อมูล history เท่ากับ 3 รายการ
        // ถ้าช่อง search ไม่ใช่ว่าง ให้เก็บข้อมูล
        if (this.searchValue !== '') {
          let searchItem = [];                     // ให้เอาข้อมูลตัวแรกออก แล้งจึงจัดเก็บเพิ่ม
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.historySearch.length ; i++) {
            if (i !== 0) { // ตัดค่าแรกออก
              searchItem = searchItem.concat(this.historySearch[i]);
            }
          }
          searchItem = searchItem.concat(this.searchValue); // มารวมกับค่า search ปัจจุบัน
          this.storage.setStorage('search', searchItem);
        }
    }
    this.searchValue = ''; // เคลียค่าในช่อง search
  }

  // แสดง history(หน้า home)
  async readHistory(fromValue) {

    this.isItem = true;
    this.isSearch = false;
    this.isSearchAndFilter = false;
    this.isMenu = false;

    let historyData;
    await this.storage.getStorage('search').then((data: any) => {
      historyData = data;
    });

    const obj = {history: historyData };
    const  formHistory = JSON.stringify(obj);

    this.service.postHistory(formHistory, fromValue).subscribe((res: Items[]) => {
      this.itemValue = this.itemValue.concat(res);  // เรียกมา add ใน item เรื่อยๆ
    }, err => {
      this.haveData = false;
    });
  }

  // ช่อง search
  search() {
    this.haveData = true;
    this.from = 0;
    this.itemValue = []; // reset ค่า item
    // กรณีช่อง search มีค่า
    if (this.searchValue !== '') {
      // กรณีใช้ filter
      if (this.modalValue !== null) {
        // รับค่าที่ได้รับมาจาก modal filter
        this.readNameAndFilter(this.searchValue, this.modalValue.web, this.modalValue.min, this.modalValue.max, this.from);
      } else {  // กรณีไม่ได้ใช้ filter
        this.readName(this.searchValue, this.from);
      }
    } else { // กรณีช่อง search ไม่มีค่า
      this.readHistory(0);  // ค่าเริ่มต้น
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
      // กรณีมีการค้นพบให้เก็บ history การค้นไว้
      if (res.length !== 0) {
        this.keepHistory();
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
      // กรณีมีการค้นพบให้เก็บ history การค้นไว้
      if (res.length !== 0) {
        this.keepHistory();
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
        this.readHistory(this.from);
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
