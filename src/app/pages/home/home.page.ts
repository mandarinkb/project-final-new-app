import { Component, OnInit} from '@angular/core';
import { MenuController, Platform, LoadingController, ModalController, IonInfiniteScroll, Events } from '@ionic/angular';
import { SearchFilterPage } from '../modal/search-filter/search-filter.page';
import { AllService } from 'src/app/share/service/all.service';
import { Items } from 'src/app/share/model/items.model';
import { LocalStorageService } from 'src/app/share/service/local-storage.service';
import { SettingPage } from '../setting/setting.page';
import { AboutPage } from '../about/about.page';

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

  // isFocus = false;
  historySearch: any = []; // ไว้เก็บค่า search ลง storage

  isRemainder: any;
  listWebNameStorage: any;
  listWebNameDatabase: any;

  statusUserId: boolean;
  userIdFromStorage: string;

  isOpenModal = false;
  isPageLoading = false;
  constructor(public service: AllService,
              private menuController: MenuController,
              private platform: Platform,
              public modalCtrl: ModalController,
              public storage: LocalStorageService,
              public loadingController: LoadingController,
              public events: Events) { }

  ngOnInit() {
    // this.loadingLeart();
    this.readHistory(this.from);
    this.checkWebInStorage();
    this.checkUserIdInStorage();
  }

  checkWebInStorage() {
    this.getWebNameDatabase();
    this.getWebNameStorage();
    // หน่วงเวลา 1 วินาทีแล้วค่อยทำงาน
    setTimeout(() => {
      // กรณีไม่มีค่าในแอพ storage (เปิดใช้งานครั้งแรก) ให้บันทึกชื่อเว็บไว้
      if (this.listWebNameStorage === null) {
        const newData: any = [];
        console.log('storage is empty');
        for (const webNameDatabase of this.listWebNameDatabase) {
          const obj = {
            webName: webNameDatabase.webName,
            status: 1
          };
          newData.push(obj);
        }
        this.storage.setStorage('web', newData);
        console.log(newData);
      } else { // กรณีที่มีค่าใน storage
        // กรณี web database มีข้อมูล web ใหม่มา
        if (this.listWebNameDatabase.length >= this.listWebNameStorage.length) {
          const newWeb: any = [];
          for (const item of this.listWebNameDatabase) {
            let statusNewWeb = false;
            for (const itemStorage of this.listWebNameStorage) {
              if (item.webName === itemStorage.webName) {
                const originalWeb = {
                  webName: itemStorage.webName,
                  status: itemStorage.status
                };
                newWeb.push(originalWeb);
                statusNewWeb = true;
              }
            }
            // แสดง ชื่อเว็บใหม่มา
            if (!statusNewWeb) {
              console.log(item.webName);
              const addNewWeb = {
                webName: item.webName,
                status: 1
              };
              newWeb.push(addNewWeb);
            }
          }
          // await this.storage.setStorage('web', newWeb); // เพิ่มชื่อเว็บเข้าไป
          this.storage.setStorage('web', newWeb); // เพิ่มชื่อเว็บเข้าไป
          // กรณีข้อมูลใน storage เป็นข้อมูลเก่าให้ลบทิ้ง
        } else if (this.listWebNameDatabase.length < this.listWebNameStorage.length) {
          const oldWeb: any = [];
          for (const itemStorage of this.listWebNameStorage) {
            for (const itemDatabase of this.listWebNameDatabase) {
              if (itemStorage.webName === itemDatabase.webName) {
                const originalWeb = {
                  webName: itemStorage.webName,
                  status: itemStorage.status
                };
                oldWeb.push(originalWeb);
              }
            }
          }
          // await this.storage.setStorage('web', oldWeb); // ลบชื่อเว็บ
          this.storage.setStorage('web', oldWeb); // ลบชื่อเว็บ
        }
      }
    }, 1000);
  }

  getWebNameStorage() {
    this.storage.getStorage('web').then((data: any) => {
      this.listWebNameStorage = data;
      // console.log(data);
    });
  }
  getWebNameDatabase() {
    this.service.getWebName().subscribe((res) => {
      this.listWebNameDatabase = res;
      // console.log(res);
    }, err => {
      console.log(err);
    });
  }

  async checkUserIdInStorage() {
    await this.getUserIdInStorage();
    // console.log(this.statusUserId);
    if (this.statusUserId) {
      this.createUserId();
    }
  }

  async getUserIdInStorage() {
    await this.storage.getStorage('userId').then((data: any) => {
      if (data === null) {
        this.statusUserId = true;
      } else {
        this.userIdFromStorage = data;
        this.statusUserId = false;
      }
    });
  }
  // สร้าง user id
  createUserId() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 5; i++) { // สร้าง 5 ตัวอักษร
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    // return result;
    this.storage.setStorage('userId', result);
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
        for (let i = 0; i < this.historySearch.length; i++) {
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

    const obj = { history: historyData };
    const formHistory = JSON.stringify(obj);

    this.service.postHistory(formHistory, fromValue).subscribe((res: Items[]) => {
      this.itemValue = this.itemValue.concat(res);  // เรียกมา add ใน item เรื่อยๆ
      // this.dismissLoadingAleart();
    }, err => {
      this.haveData = false;

      // this.dismissLoadingAleart();
    });
  }

  // ช่อง search
  search() {
    this.haveData = true;
    this.from = 0;
    this.itemValue = []; // reset ค่า item
    // กรณีช่อง search มีค่า
    if (this.searchValue !== '') {
        this.readName(this.searchValue, this.from);
        console.log('search');
        this.title = this.searchValue;

    } else { // กรณีช่อง search ไม่มีค่า
      this.readHistory(0);  // ค่าเริ่มต้น
    }
    this.modalValue = null;
  }
  searchFilterCall() {
    this.haveData = true;
    this.from = 0;
    this.itemValue = []; // reset ค่า item
    if (this.modalValue.length !== 0) {
      this.readNameAndFilter(this.modalValue.search, this.modalValue.web, this.modalValue.min, this.modalValue.max, this.from);
      console.log('search filter');
      this.title = this.modalValue.search;
    } else { // กรณีช่อง search ไม่มีค่า
      this.readHistory(0);  // ค่าเริ่มต้น
    }
    this.modalValue = null;
  }

  // search by name
  async readName(n, fromValue) {
    // if (fromValue === 0) {
    //   this.loadingLeart();
    // }

    this.isItem = false;
    this.isSearch = true;
    this.isSearchAndFilter = false;
    this.isMenu = false;

    await this.getUserIdInStorage();

    const objName = {
      userId: this.userIdFromStorage,
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
      // this.dismissLoadingAleart();
    }, err => {
      this.haveData = false;
      // this.dismissLoadingAleart();
    });
  }

  // search by name และใช้ filter search
  async readNameAndFilter(n, wn, mi, ma, fromValue) {
    // if (fromValue === 0) {
    //   this.loadingLeart();
    // }
    this.isItem = false;
    this.isSearch = false;
    this.isSearchAndFilter = true;
    this.isMenu = false;

    await this.getUserIdInStorage();

    const objName = {
      userId: this.userIdFromStorage,
      name: n,
      webName: wn,
      minPrice: mi,
      maxPrice: ma
    };
    this.jsonNameAndFilter = JSON.stringify(objName); // create json
    this.service.postNameAndFilter(this.jsonNameAndFilter, fromValue).subscribe((res: Items[]) => {
      console.log(this.itemValue);

      this.itemValue = this.itemValue.concat(res);
      // ค้นหาไม่พบให้แจ้งเตือน
      if (res.length === 0 && fromValue === 0) {
        this.haveData = false;
      }
      // กรณีมีการค้นพบให้เก็บ history การค้นไว้
      if (res.length !== 0) {
        this.keepHistory();
      }
      // this.dismissLoadingAleart();
    }, err => {
      this.haveData = false;
      // this.dismissLoadingAleart();
    });
  }

  // เลือกเมนู
  selectMenu(value) {
    this.title = value;
    this.haveData = true;
    this.from = 0;
    this.itemValue = []; // reset ค่า item
    this.getWebNameStorage();
    this.getUserIdInStorage();
    // หน่วงเวลา 0.5 วิ เพื่อให้ดึงข้อมูลจาก storage มาก่อน
    setTimeout(() => {
      this.readCategory(value, this.from);
      this.menuController.close(); // close menu
    }, 500);
  }

  // search by menu
  async readCategory(c, fromValue) {
    // if (fromValue === 0) {
    //   this.loadingLeart();
    // }
    // await this.getWebNameStorage();
    const webNameValue: any = [];
    for (const webNameStorage of this.listWebNameStorage) {
      if (webNameStorage.status) {
        webNameValue.push(webNameStorage.webName);
      }
    }
    this.isItem = false;
    this.isSearch = false;
    this.isSearchAndFilter = false;
    this.isMenu = true;
    // await this.getUserIdInStorage();
    const objCategory = {
      userId: this.userIdFromStorage,
      category: c,
      webName: webNameValue
    };
    this.jsonCategory = JSON.stringify(objCategory); // create json
    console.log(this.jsonCategory);
    this.service.postCategory(this.jsonCategory, fromValue).subscribe((res: Items[]) => {
      console.log('category => ', res);
      if (res.length === 0 && fromValue === 0) {
        this.haveData = false;
      }
      this.itemValue = this.itemValue.concat(res);
      // this.categoryData = res;
      // this.dismissLoadingAleart();
    }, err => {
      this.haveData = false;
      // this.dismissLoadingAleart();
    });
  }
  // modal search filter เมื่อปิด modal จะเรียกอัตโนมัติ
  async searchFilter() {
    const modal = await this.modalCtrl.create({
      component: SearchFilterPage // อ้างอิงจาก modal filter
    });
    modal.onDidDismiss()
      .then((data) => {
        this.modalValue = data.data;  // เซ็ตค่าที่รับจาก modal search filter
        if (data.data != null) {
          this.searchFilterCall();
        }
      });
    return await modal.present().then(() => {
      this.isOpenModal = true;
   });
  }

  async setting() {
    const modal = await this.modalCtrl.create({
      component: SettingPage // อ้างอิงจาก modal filter
    });
    modal.onDidDismiss().then((data) => {
    });
    return setTimeout(() => {modal.present().then(() => { // หน่วงเวลา 0.5 วินาทีเพื่อให้ดึงข้อมูลจาก storage มาก่อน
      this.isOpenModal = true;
   }); }, 1000);
  }

  // modal about
  async about() {
    const modal = await this.modalCtrl.create({
      component: AboutPage // อ้างอิงจาก AboutPage
    });
    modal.onDidDismiss().then((data) => {
    });
    return await modal.present().then(() => {
      this.isOpenModal = true;
   });
  }

  // สำหรับ infinite-scroll
  loadData(event) {
    setTimeout(() => {
      // console.log('infinite-scroll loading');
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
    }, 500);
  }
  // ปิด app เมื่อกดปุ่ม back button
  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      // กรณีไม่ได้เปิด modal ให้ปิดแอพ
      if (!this.isOpenModal) {
        // tslint:disable-next-line:no-string-literal
        navigator['app'].exitApp();
      } else {// กรณีเปิด modal ให้ปิด modal ก่อนปิดแอพ
        this.isOpenModal = false;
      }
    });
  }
  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
  // end function ปิด app เมื่อกดปุ่ม back button

  // async loadingLeart() {
  //   this.isPageLoading = true;
  //   return await this.loadingController.create({
  //     cssClass: 'my-custom-class',
  //     message: 'Please wait...'
  //     // duration: 5000,
  //   }).then(a => {
  //     a.present().then(() => {
  //       if (!this.isPageLoading) {
  //         a.dismiss().then(() => {});
  //       }
  //     });
  //   });
  // }

  // async dismissLoadingAleart() {
  //   this.isPageLoading = false;
  //   return await this.loadingController.dismiss().then(() => {});
  // }
}



