import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/share/service/local-storage.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  public ListWebNameStorage: any;
  listWebNameDatabase: any;
  constructor(private modalCtrl: ModalController,
              private storage: LocalStorageService) {}

  ngOnInit() {
    // this.checkWebInStorage();
    this.getWebNameStorage();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async getWebNameStorage() {
    await this.storage.getStorage('web').then((data: any) => {
      this.ListWebNameStorage = data;
      // console.log(data);
    });
  }
   /*
  async getWebNameDatabase() {
    await this.service.getWebName().subscribe((res) => {
      this.listWebNameDatabase = res;
      // console.log(res);
    }, err => {
      console.log(err);
    });
  }
*/
  onChanged(event, name: string) {
    const newData: any = [];
    for (const item of this.ListWebNameStorage) {
      if (item.webName !== name) { // เก็บเว็บเดิมที่ไม่ได้แก้ไข
        const obj = {
          webName: item.webName,
          status: item.status
        };
        newData.push(obj);
      } else { // เก็บเว็บที่แก้ไข
        if (event.target.checked) { // open
          const objOpen = {
            webName: name,
            status: 1
          };
          newData.push(objOpen);
        } else { // close
          const objClose = {
            webName: name,
            status: 0
          };
          newData.push(objClose);
        }
      }
    }
    // console.log(newData);
    this.storage.setStorage('web', newData);
  }

/*
  async checkWebInStorage() {
    await this.getWebNameDatabase();
    await this.getWebNameStorage();
    // กรณีไม่มีค่าในแอพ storage (เปิดใช้งานครั้งแรก) ให้บันทึกชื่อเว็บไว้
    if (this.ListWebNameStorage === null) {
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
      if (this.listWebNameDatabase.length >= this.ListWebNameStorage.length) {
        const newWeb: any = [];
        for (const item of this.listWebNameDatabase) {
          let statusNewWeb = false;
          for (const itemStorage of this.ListWebNameStorage) {
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
        await this.storage.setStorage('web', newWeb); // เพิ่มชื่อเว็บเข้าไป
        // กรณีข้อมูลใน storage เป็นข้อมูลเก่าให้ลบทิ้ง
      } else if (this.listWebNameDatabase.length < this.ListWebNameStorage.length) {
        const oldWeb: any = [];
        for (const itemStorage of this.ListWebNameStorage) {
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
        await this.storage.setStorage('web', oldWeb); // เพิ่มชื่อเว็บเข้าไป
      }
    }
  }
*/
}
